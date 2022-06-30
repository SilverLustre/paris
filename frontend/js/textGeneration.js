// Title Block
function setServiceStatus(status){
    var serviceStatus = document.getElementById("serviceStatus")
    if (status === "Online"){
        serviceStatus.innerHTML = status;
        serviceStatus.classList.replace("red", "green");
    }else if (status === "Offline"){
        serviceStatus.innerHTML = status;
        serviceStatus.classList.replace("green", "red");
    }
}
window.setInterval(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4){
            if (this.status === 200){
                // console.log(this.status);
                // console.log(this.responseText);
                setServiceStatus("Online");
            }else{
                // console.log(this.status);
                // console.log(this.responseText);
                setServiceStatus("Offline");
            }
        }
    }

    xhttp.timeout = 8000;
    xhttp.ontimeout = function(){
        // console.log('Status check timed out.')
    }
    xhttp.open("GET", "http://127.0.0.1:8000/aloha");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000/");
    xhttp.send(null, true);
}, 10000);

// Configurations Block
var textTypeClrBt = document.getElementById("textTypeClrBt");
textTypeClrBt.onclick = function(){
    document.getElementById("textTypeInput").value = '';
}

var toneClrBt = document.getElementById("toneClrBt");
toneClrBt.onclick = function(){
    document.getElementById("toneInput").value = '';
}

var targetAudienceClrBt = document.getElementById("targetAudienceClrBt");
targetAudienceClrBt.onclick = function(){
    document.getElementById("targetAudienceInput").value = '';
}

var keywordsClrBt = document.getElementById("keywordsClrBt");
keywordsClrBt.onclick = function(){
    document.getElementById("keywordsInput").value = '';
}

var topicTextareaClrBt = document.getElementById("topicTextareaClrBt");
topicTextareaClrBt.onclick = function(){
    document.getElementById("topicTextarea").value = '';
}

// Model Parameters Block

var promptTextarea = document.getElementById("promptTextarea");


function generatePrompt(){
    console.log("generatePrompt");
    
    var numOfSubsInput = document.getElementById("numOfSubsInput").value;
    var textType = document.getElementById("textTypeInput").value;
    textType = textType===''?'article':textType;
    var topic = document.getElementById("topicTextarea").value;
    var tone = document.getElementById("toneInput").value;
    var targetAudience = document.getElementById("targetAudienceInput").value;
    var keywords = document.getElementById("keywordsInput").value;

    if (topic===''){
        alert('You must specify a topic!');
        return;
    }
    

    var elements = []
    if (numOfSubsInput===''||numOfSubsInput===0||numOfSubsInput==='0'){
        // without specified subtitles
        elements = ['Write a'];
        if (textType[0])
        elements.push(textType);
        elements.push('about');
        elements.push(topic);
        if (tone!==''){
            elements.push('in');
            elements.push(tone);
            elements.push('tone');
        }
        if (targetAudience!==''){
            elements.push('targeting the audience of');
            elements.push(targetAudience);
        }
        if (keywords!==''){
            elements.push('with keywords:');
            elements.push(keywords);
        }
    }else{
        // with specified subtitles
        elements = ['Generate'];
        elements.push(numOfSubsInput);
        elements.push('subtitles of a');
        elements.push(textType);
        elements.push('about');
        elements.push(topic);
        if (tone!==''){
            elements.push('in');
            elements.push(tone);
            elements.push('tone');
        }
        if (targetAudience!==''){
            elements.push('targeting the audience of');
            elements.push(targetAudience);
        }
        if (keywords!==''){
            elements.push('with keywords:');
            elements.push(keywords);
        }
    }

    promptTextarea.value = elements.join(' ');
}




var modelParamsGenPromptBt = document.getElementById("modelParamsGenPromptBt");
modelParamsGenPromptBt.onclick = function(){
    generatePrompt();
}

var modelParamsGenArticleBt = document.getElementById("modelParamsGenArticleBt");


// Prompt Block
function generateSubtitles(){
    console.log('generateSubtitles');
    var subtitlesTextarea = document.getElementById('subtitlesTextarea');
    var numOfSubsInput = document.getElementById("numOfSubsInput").value;
    if (numOfSubsInput===''||numOfSubsInput===0||numOfSubsInput==='0'){
        alert('Number of subtitles must be set larger than 0.');
        return;
    }
    subtitlesTextarea.value = 'Generating...';
    var engine = document.getElementById('modelSelect').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;
    var prompt = document.getElementById('promptTextarea').value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4){
            // complete
            if (this.status === 200){
                console.log(this.responseText);
                var jsonObj = JSON.parse(JSON.parse(this.responseText));
                subtitlesTextarea.value = jsonObj.subtitles.join('\n');
            }
        }
    }
    xhttp.open("POST","http://127.0.0.1:8000/subtitle");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000/");
    xhttp.send(JSON.stringify({
        "engine": engine,
        "temperature": temperature,
        "max_tokens": maxToken,
        "frequency_penalty":freqPenalty,
        "presence_penalty": presencePenalty,
        "prompt": prompt
    }),true);

}



var promptClrBt = document.getElementById("promptClrBt");
promptClrBt.onclick = function(){
    promptTextarea.value='';
}

var promptGenSubsBt = document.getElementById("promptGenSubsBt");
promptGenSubsBt.onclick = function(){
    generateSubtitles();
}

var promptGenArticleBt = document.getElementById("promptGenArticleBt");
// promptGenArticleBt.onclick = function(){

// }

// Subtitles Block
function subtitlesToArticle(){
    console.log("subtitlesToArticle");
    var genResultTextarea = document.getElementById("genResultTextarea");

    var subtitlesTextarea = document.getElementById("subtitlesTextarea");
    var subtitles = subtitlesTextarea.value.split(/\r?\n/);
    var engine = document.getElementById('modelSelect').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;
    var prompt = document.getElementById('promptTextarea').value;

    var numOfSubsInput = document.getElementById("numOfSubsInput").value;
    var textType = document.getElementById("textTypeInput").value;
    textType = textType===''?'article':textType;
    var topic = document.getElementById("topicTextarea").value;
    var tone = document.getElementById("toneInput").value;
    var targetAudience = document.getElementById("targetAudienceInput").value;
    var keywords = document.getElementById("keywordsInput").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4){
            if (this.status === 200){
                var jsonObj = JSON.parse(JSON.parse(this.responseText));
                genResultTextarea.value = jsonObj.article;
            }
        }
    }

    xhttp.open("POST", "http://127.0.0.1:8000/article");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000/");
    xhttp.send(JSON.stringify({
        "subtitles":subtitles,
        "prompt": prompt,
        "article_type": textType,
        "topic": topic,
        "tone": tone,
        "audience": targetAudience,
        "keywords": keywords,
        "num_subtitles": numOfSubsInput,
        "engine": engine,
        "temperature": temperature,
        "max_tokens": maxToken,
        "frequency_penalty":freqPenalty,
        "presence_penalty": presencePenalty
    }),true);
}

var subsGenArticleBt = document.getElementById("subsGenArticleBt");
subsGenArticleBt.onclick = function(){
    subtitlesToArticle();
}
