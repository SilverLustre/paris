import openai
from typing import Union
from fastapi import FastAPI

openai.api_key = "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"

class ArticleGenerator:

    def __init__(self, article_type, topic, tone = None, audience = None,
                 keywords = None, length = 2000, num_subtitles=5):
        self.article_type = article_type
        self.topic = topic
        self.tone = tone
        self.audience = audience
        self.keywords = keywords
        self.length = length
        self.num_subtitles = num_subtitles

    def generatePrompt(self, subtitle):
        prompt = f"""
                     write a {self.article_type}
                     about {subtitle}
                     in a {self.tone}
                     targeting the audience of {self.audience}
                     with keywords: {self.keywords}.
                 """
        return prompt


    def generateSubtitles(self):
        prompt = "Generate {} blog topics on: {} with keywords: {}."
                 .format(self.num_subtitles, self.topic, self.keywords)
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            temperature=0.7,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        return response['choices'][0]['text']
        '''
        res_split = response['choices'][0]['text'].split('\n')
        for line in res_split:
            if line == '':
                res_split.remove(line)

        return res_split
        '''

    def blogSectionExpander(subtitles):
        responses = []
        for subtitle in subtitles:
            prompt = generatePrompt(subtitle)
            response = openai.Completion.create(
                engine="text-davinci-002",
                prompt=prompt,
                temperature=0.7,
                max_tokens=200,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
        responses.append(response)

article_generator = ArticleGenerator("blog post", "wildlife protection")
print(article_generator.generateSubtitles())
