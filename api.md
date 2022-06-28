this is a api document
## Translator:
http://localhost:8000/translate
### input:
    content: str
    language: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
### output:
    {'data': }
### Test:

```
{
"content":"Dear Consul General. My name is Yuehao Fu, my ds160 number is AA00AVLVA3. I went to the interview on 31st May, and sent my required document ( the SEVIS fee receipt) three weeks ago. The officer kept my passport and said the visa will be approved once the document is received. I'm writing to ask about the status of my application. And since the officer did not take my envelope that time, I wonder how I will receive my passport and visa?The Following is my address, if needed: Name:Yuehao Fu, Address: Unit 215, 231 Waymouth Street, Adelaide, SA 5000.Warm regards.Yuehao",
"language":"Chinese"
}
```


## Summarizer:
http://localhost:8000/summarize
### Input:
    content: str
    tone: str = None
    audience: str = None
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
### output:
    {'data': }

## Paraphraser:
http://localhost:8000/paraphrase
### Input:
    content: str
    tone: str = None
    audience: str = None
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
### output:
    {'data': }

## EmailReplyer:
http://localhost:8000/reply
### Input:
    content: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
### output:
    {'data': }


## GenerateSubtitles:
http://localhost:8000/genSubs
### Input:
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
    prompt: str = "write a ...."

### output:
    {'subtitles': ["title1", "title2", ...]}

## SubtitlesToArticle:
http://localhost:8000/subsToArticle
### Input:
    text_type: str = "Blog Post"
    tone: str = "professional"
    target_audience = "Australian"
    keywords = ["apple", "banana"]
    number_of_subtitles: int = 5
    topic: str = "seniors love to eat ice cream"

    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0
    prompt: str = "write a ..."
    subtitle: str = ["title1", "title2", ...]

### output:
    {'article': "This is a generated article..."}