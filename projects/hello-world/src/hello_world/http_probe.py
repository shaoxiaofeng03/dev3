import time
from dataclasses import dataclass

import httpx

from hello_world.config import ProbeConfig


class ProbeError(Exception):
    """探测失败的基类。"""


class NetworkError(ProbeError):
    """连不上、握手失败、超时、连接中断。"""


class StatusError(ProbeError):
    """服务器返回了 4xx / 5xx。"""

    def __init__(self, status: int, body: str) -> None:
        super().__init__(f"HTTP {status}: {body[:200]}")
        self.status = status


@dataclass(frozen=True, slots=True)
class ProbeResult:
    status: int
    elapsed_ms: float
    request_id: str | None
    body_preview: str


def probe(config: ProbeConfig) -> ProbeResult:
    timeout = httpx.Timeout(
        connect=config.connect_timeout,
        read=config.read_timeout,
        write=config.read_timeout,
        pool=config.connect_timeout,
    )
    started = time.perf_counter()
    try:
        with httpx.Client(timeout=timeout, headers=config.headers) as client:
            resp = client.get(config.url)
            resp.raise_for_status()
    except httpx.TimeoutException as exc:
        raise NetworkError(f"请求超时: {config.url}") from exc
    except httpx.RequestError as exc:
        raise NetworkError(f"网络错误: {exc!r}") from exc
    except httpx.HTTPStatusError as exc:
        raise StatusError(exc.response.status_code, exc.response.text) from exc

    elapsed_ms = (time.perf_counter() - started) * 1000
    return ProbeResult(
        status=resp.status_code,
        elapsed_ms=round(elapsed_ms, 1),
        request_id=resp.headers.get("x-request-id")
        or resp.headers.get("x-ds-trace-id"),
        body_preview=resp.text[:200],
    )
