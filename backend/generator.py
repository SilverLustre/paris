import os
import openai
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import json
import re

openai.api_key = os.environ.get('OPENAI_API_KEY')

class Item(BaseModel):
    prompt: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 2000
    frequency_penalty: float = 0
    presence_penalty: float = 0

class ArticleItem(BaseModel):
    text_type: str
    tone: str = None
    audience: str = None
    keywords: str = None
    number_of_subtitles: int
    topic: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 2000
    frequency_penalty: float = 0
    presence_penalty: float = 0
    prompt: str
    subtitles: list = []


class SubtitleGenerator:
    def __init__(self,prompt, engine = "text-davinci-002",temperature=1, max_tokens=2000,
                 frequency_penalty=0,presence_penalty=0,):
        self.prompt = prompt
        self.engine = engine
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.frequency_penalty = frequency_penalty
        self.presence_penalty = presence_penalty

    def generateSubtitles(self):
        response = openai.Completion.create(
            engine=self.engine,
            prompt=self.prompt,
            temperature=0.7,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        #print(type(response['choices'][0]['text']))

        res_split = response['choices'][0]['text'].split('\n')
        res_list = []
        for line in res_split:
            if len(line)>2:
                line =  re.sub("^[0-9].","",line)
                line.strip()
                res_list.append(line)
        print(res_list)
        return res_list

class ArticleGenerator:

    def __init__(self, article_type=None, topic=None, tone = None, audience = None,
                 keywords = None, num_subtitles=5,engine = "text-davinci-002",
                 temperature=1, max_tokens=2000,frequency_penalty=0,presence_penalty=0,
                 prompt=None, subtitles=None):
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
        self.prompt = prompt
        self.subtitles = subtitles


    def expandSubtitle(self):
        article = ""
        for subtitle in self.subtitles:
            if subtitle!="":
                prompt = "write a {} paragraph about {} in {} tone to {}, with keywords: {}".format(self.article_type, subtitle, self.tone, self.audience, self.keywords)
                response = openai.Completion.create(
                    engine=self.engine,
                    prompt=prompt,
                    temperature=self.temperature,
                    max_tokens=self.max_tokens,
                    top_p=1,
                    frequency_penalty=self.frequency_penalty,
                    presence_penalty=self.presence_penalty
                )
                article+=response['choices'][0]['text']
                article+='/n'
        return article

app = FastAPI()

@app.post("/gensubs")
async def createItem(item:Item):
    generator = SubtitleGenerator(item.prompt, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'subtitles': generator.generateSubtitles()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ':'),ensure_ascii=False)
    return jsondata

@app.post("generate/article")
async def createItem(item:ArticleItem):
    generator = ArticleGenerator(item.subtitles,item.article_type, item.topic, item.tone, item.audience, item.keywords, item.num_subtitles, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'data': generator.expandSubtitle()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ':'),ensure_ascii=False)
    return jsondata

if __name__ == '__main__':
    uvicorn.run(app)
