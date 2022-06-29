import openai
import json
from fastapi import APIRouter
from fastapi import Query
from core.model.subtitle_item import SubtitleItem
import re

router = APIRouter(
    prefix="/subtitle",
    tags=["Subtitle"],
    responses={404: {"description": "Not found"}},
)

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

@router.post("/")
async def createItem(item:SubtitleItem):
    generator = SubtitleGenerator(item.prompt, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'subtitles': generator.generateSubtitles()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ':'),ensure_ascii=False)
    return jsondata
