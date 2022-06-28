import openai
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import json

openai.api_key =  os.environ.get('OPENAI_API_KEY')

app = FastAPI()

class Item(BaseModel):
    content: str
    tone: str = None
    audience: str = None
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0

class Summarizer:
    content: str
    tone: str = None
    audience: str = None
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0

    def __init__(self, text, tone, audience, engine = "text-davinci-002",temperature=1,
                 max_tokens=1000,frequency_penalty=0,presence_penalty=0):
        self.text = text
        self.tone = tone
        self.audience = audience
        self.engine = engine
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.frequency_penalty = frequency_penalty
        self.presence_penalty = presence_penalty

    def summarize(self):
        prompt = "Summarize the following text to {} in {} tone. Text: {}".format(self.audience, self.tone, self.text)
        response = openai.Completion.create(
            model=self.engine,
            prompt=prompt,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty
        )
        return response['choices'][0]['text']

@app.post("/summarize")
async def createItem(item:Item):
    summarizer = Summarizer(item.content, item.tone, item.audience, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'data': summarizer.summarize()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ': '),ensure_ascii=False)
    return jsondata


if __name__ == '__main__':
    uvicorn.run(app)
