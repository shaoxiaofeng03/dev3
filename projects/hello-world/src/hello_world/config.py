from dataclasses import dataclass, field


@dataclass(frozen=True, slots=True)
class ProbeConfig:
    url: str
    connect_timeout: float = 5.0
    read_timeout: float = 10.0
    headers: dict[str, str] = field(default_factory=dict)
