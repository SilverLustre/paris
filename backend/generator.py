import os
import openai
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import json

openai.api_key = os.environ.get('OPENAI_API_KEY')

class Item(BaseModel):
    article_type: str
    topic: str
    tone: str = None
    audience: str = None
    keywords: str = None
    num_subtitles: int = 5
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 2000
    frequency_penalty: float = 0
    presence_penalty: float = 0

class ArticleItem(BaseModel):
    subtitles: list = []
    article_type: str
    topic: str
    tone: str = None
    audience: str = None
    keywords: str = None
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 2000
    frequency_penalty: float = 0
    presence_penalty: float = 0

class ArticleGenerator:

    def __init__(self, article_type, topic, tone = None, audience = None,
                 keywords = None, num_subtitles=5,engine = "text-davinci-002",
                 temperature=1, max_tokens=2000,frequency_penalty=0,presence_penalty=0):
        self.article_type = article_type
        self.topic = topic
        self.tone = tone
        self.audience = audience
        self.keywords = keywords
        self.num_subtitles = num_subtitles
        self.engine = engine
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.frequency_penalty = frequency_penalty
        self.presence_penalty = presence_penalty

    def generatePrompt(self, subtitle):
        prompt = "write a {} about {} in a {} targeting the audience of {} with keywords: {}".format(self.article_type, subtitle, self.tone, self.audience, self.keywords)
        return prompt


    def generateSubtitles(self):
        prompt = "Generate {} {} topics on: {} with keywords: {}.".format(self.num_subtitles, self.article_type, self.topic, self.keywords)
        response = openai.Completion.create(
            engine=self.engine,
            prompt=prompt,
            temperature=0.7,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        print(type(response['choices'][0]['text']))

        res_split = response['choices'][0]['text'].split('\n')
        for line in res_split:
            if line == '':
                res_split.remove(line)

        return res_split


    def expandSubtitle(self,subtitle):
        prompt = self.generatePrompt(subtitle)
        response = openai.Completion.create(
            engine=self.engine,
            prompt=prompt,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            top_p=1,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty
        )
        return response['choices'][0]['text']

app = FastAPI()

@app.post("/generate/subtitle")
async def createItem(item:Item):
    generator = ArticleGenerator(item.article_type, item.topic, item.tone, item.audience, item.keywords, item.num_subtitles, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'data': generator.generateSubtitles()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ': '))
    return jsondata

@app.post("generate/article")
async def createItem(item:Item):


if __name__ == '__main__':
    uvicorn.run(app)

article_generator = ArticleGenerator("blog post", "wildlife protection")
subtitles = article_generator.generateSubtitles()
print(subtitles)
article = ""
for subtitle in subtitles:
    if subtitle!='':
        article+=subtitle
        article+='/n'
        article+=article_generator.expandSubtitle(subtitle)
        article+='/n'
print(article)
