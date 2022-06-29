from pydantic import BaseModel, Field
from typing import Optional

class ParaItem(BaseModel):
    content: str
    tone: str = None
    audience: str = None
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
