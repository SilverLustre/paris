from pydantic import BaseModel, Field
from typing import Optional

class ArticleItem(BaseModel):
    subtitles: list = []
    prompt: str = None
    article_type: str = "article"
    topic: str = None
    tone: str = None
    audience: str = None
    keywords: str = None
    num_subtitles: int = 5
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
