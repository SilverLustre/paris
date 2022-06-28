import os
import openai
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import json

openai.api_key = os.environ.get('OPENAI_API_KEY')

class ArticleGenerator:

    def __init__(self, article_type, topic, tone = None, audience = None,
                 keywords = None, length = 2000, num_subtitles=5,
                 engine = "text-davinci-002", temperature=1, max_tokens=500,
                 frequency_penalty=0,presence_penalty=0):
        self.article_type = article_type
        self.topic = topic
        self.tone = tone
        self.audience = audience
        self.keywords = keywords
        self.length = length
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
        prompt = "Generate {} blog topics on: {} with keywords: {}.".format(self.num_subtitles, self.topic, self.keywords)
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
