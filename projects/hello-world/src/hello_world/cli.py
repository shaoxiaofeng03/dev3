# src/hello_world/cli.py
import argparse
import json
import sys
from dataclasses import asdict

from hello_world.config import ProbeConfig
from hello_world.http_probe import ProbeError, probe


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="hello-world", description="HTTP 探测工具")
    parser.add_argument("url", help="要请求的 URL")
    parser.add_argument("--connect-timeout", type=float, default=5.0)
    parser.add_argument("--read-timeout", type=float, default=10.0)
    parser.add_argument("--header", action="append", default=[], metavar="K:V")
    args = parser.parse_args(argv)

    headers: dict[str, str] = {}
    for raw in args.header:
        key, sep, value = raw.partition(":")
        if not sep:
            parser.error(f"--header 需要 K:V 格式，收到: {raw}")
        headers[key.strip()] = value.strip()

    config = ProbeConfig(
        url=args.url,
        connect_timeout=args.connect_timeout,
        read_timeout=args.read_timeout,
        headers=headers,
    )
    try:
        result = probe(config)
    except ProbeError as exc:
        print(f"[error] {exc}", file=sys.stderr)
        return 1

    print(json.dumps(asdict(result), ensure_ascii=False, indent=2))
    return 0
