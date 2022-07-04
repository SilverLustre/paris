import openai
import json
from fastapi import APIRouter
from fastapi import Query
from core.model.article_item import ArticleItem

router = APIRouter(
    prefix="/article",
    tags=["Article"],
    responses={404: {"description": "Not found"}},
)

class ArticleGenerator:

    def __init__(self, subtitles, prompt=None, article_type=None, topic=None, tone = None, audience = None,
                 keywords = None, num_subtitles=5,engine = "text-davinci-002",
                 temperature=1, max_tokens=2000,frequency_penalty=0,presence_penalty=0):
        self.subtitles = subtitles
        self.prompt = prompt
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



    def expandSubtitle(self):
        article = ""
        for subtitle in self.subtitles:
            if subtitle!="":
                prompt = "Expand the {} section about {} in to a {} explanation, targeting the audience of {}, with keywords: {}".format(self.article_type, subtitle, self.tone, self.audience, self.keywords)
                response = openai.Completion.create(
                    engine=self.engine,
                    prompt=prompt,
                    temperature=self.temperature,
                    max_tokens=self.max_tokens,
                    top_p=1,
                    frequency_penalty=self.frequency_penalty,
                    presence_penalty=self.presence_penalty
                )
                article+=subtitle
                article+='\n'
                article+=response['choices'][0]['text']
                article+='\n'
        return article

@router.post("/")
def createItem(item:ArticleItem):
    generator = ArticleGenerator(item.subtitles,item.prompt,item.article_type, item.topic, item.tone, item.audience, item.keywords, item.num_subtitles, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'article': generator.expandSubtitle()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ':'),ensure_ascii=False)
    return jsondata
