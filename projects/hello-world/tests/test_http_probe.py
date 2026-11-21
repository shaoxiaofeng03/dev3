"""W1 周三 · HTTP 探测工具的失败路径测试。

运行：
    cd projects/hello-world
    uv run pytest -q

这组测试不访问真实网络。其中
`test_http_error_maps_to_status_error` 目前会红：错误路径还没有
携带 request_id 和 elapsed_ms。先不要改实现，带着这个红色去
`/review`，让 review 先问你三个问题。
"""

import httpx
import pytest

from hello_world.config import ProbeConfig
from hello_world.http_probe import NetworkError, ProbeResult, StatusError, probe

URL = "https://example.com/probe"


def _request() -> httpx.Request:
    return httpx.Request("GET", URL)


def _response(
    status: int,
    *,
    text: str = "",
    headers: dict[str, str] | None = None,
) -> httpx.Response:
    return httpx.Response(status, text=text, headers=headers, request=_request())


def _patch_get(monkeypatch, *, response=None, error=None):
    def fake_get(self, url, **kwargs):
        if error is not None:
            raise error
        return response

    monkeypatch.setattr(httpx.Client, "get", fake_get)


def test_timeout_maps_to_network_error(monkeypatch):
    _patch_get(
        monkeypatch,
        error=httpx.ReadTimeout("read timed out", request=_request()),
    )

    with pytest.raises(NetworkError) as excinfo:
        probe(ProbeConfig(url=URL, read_timeout=0.01))

    assert "超时" in str(excinfo.value)
    assert URL in str(excinfo.value)


@pytest.mark.parametrize("status", [401, 500])
def test_http_error_maps_to_status_error(monkeypatch, status):
    response = _response(
        status,
        text='{"error": "boom"}',
        headers={"x-ds-trace-id": "trace-123"},
    )
    _patch_get(monkeypatch, response=response)

    with pytest.raises(StatusError) as excinfo:
        probe(ProbeConfig(url=URL))

    error = excinfo.value
    assert error.status == status
    assert "boom" in str(error)

    # 目标：错误路径也要保留可观测字段（讲义 5.5）。
    # 当前实现还没有这两个属性，所以这里会红。
    assert error.request_id == "trace-123"
    assert error.elapsed_ms >= 0


def test_invalid_json_body_is_reported_without_crashing(monkeypatch):
    response = _response(
        200,
        text="<html>not json</html>",
        headers={"content-type": "text/html"},
    )
    _patch_get(monkeypatch, response=response)

    result = probe(ProbeConfig(url=URL))

    assert isinstance(result, ProbeResult)
    assert result.status == 200
    assert "<html>not json</html>" in result.body_preview
