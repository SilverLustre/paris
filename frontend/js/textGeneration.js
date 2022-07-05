// Title Block
// function setServiceStatus(status){
//     var serviceStatus = document.getElementById("serviceStatus")
//     if (status === "Online"){
//         serviceStatus.innerHTML = status;
//         serviceStatus.classList.replace("red", "green");
//     }else if (status === "Offline"){
//         serviceStatus.innerHTML = status;
//         serviceStatus.classList.replace("green", "red");
//     }
// }
// window.setInterval(function(){
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function(){
//         if (this.readyState === 4){
//             if (this.status === 200){
//                 // console.log(this.status);
//                 // console.log(this.responseText);
//                 setServiceStatus("Online");
//             }else{
//                 // console.log(this.status);
//                 // console.log(this.responseText);
//                 setServiceStatus("Offline");
//             }
//         }
//     }

//     xhttp.timeout = 8000;
//     xhttp.ontimeout = function(){
//         // console.log('Status check timed out.')
//     }
//     xhttp.open("GET", "http://127.0.0.1:8000/aloha");
//     xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000/");
//     xhttp.send(null, true);
// }, 10000);

document.getElementById("apiKeyInput").value = getSavedValue("apiKeyInput");
// document.getElementById("").value = getSavedValue("");
document.getElementById("topicTextarea").value = getSavedValue("topicTextarea");
document.getElementById("textTypeInput").value = getSavedValue("textTypeInput");
document.getElementById("toneInput").value = getSavedValue("toneInput");
document.getElementById("targetAudienceInput").value = getSavedValue("targetAudienceInput");
document.getElementById("keywordsInput").value = getSavedValue("keywordsInput");
document.getElementById("numOfSubsInput").value = getSavedValue("numOfSubsInput");
if (localStorage.getItem("modelSelect")!==null){
    document.getElementById("modelSelect").value = getSavedValue("modelSelect");
}
if (localStorage.getItem("maxTokenInput")!==null){
    document.getElementById("maxTokenInput").value = getSavedValue("maxTokenInput");
}
if (localStorage.getItem("tempInput")!==null){
    document.getElementById("tempInput").value = getSavedValue("tempInput");
}
if (localStorage.getItem("presencePenaltyInput")!=null){
    document.getElementById("presencePenaltyInput").value = getSavedValue("presencePenaltyInput");
}
if (localStorage.getItem("freqPenaltyInput")!==null){
    document.getElementById("freqPenaltyInput").value = getSavedValue("freqPenaltyInput");
}
document.getElementById("promptTextarea").value = getSavedValue("promptTextarea");
document.getElementById("subtitlesTextarea").value = getSavedValue("subtitlesTextarea");
document.getElementById("genResultTextarea").value = getSavedValue("genResultTextarea");

function saveValue(e){
    var id = e.id;
    var value = e.value;
    localStorage.setItem(id, value);
}

function getSavedValue(id){
    if (!localStorage.getItem(id)){
        return "";
    }
    return localStorage.getItem(id);
}

// localStore reset
var resetBt = document.getElementById("resetBt");
resetBt.onclick = function(){
    if (confirm('Are you sure to reset the page? You will lose all the data in the fields except for the API Key.')){
        console.log('clear');
        var apiKey = localStorage.getItem("apiKeyInput");
        apiKey = apiKey===null?'':apiKey;
        localStorage.clear();
        localStorage.setItem("apiKeyInput", apiKey);
        location.reload();
    }else{
        console.log('no');
    }
}

// Configurations Block
var textTypeClrBt = document.getElementById("textTypeClrBt");
textTypeClrBt.onclick = function(){
    document.getElementById("textTypeInput").value = '';
    localStorage.setItem("textTypeInput", '');
}

var toneClrBt = document.getElementById("toneClrBt");
toneClrBt.onclick = function(){
    document.getElementById("toneInput").value = '';
    localStorage.setItem("toneInput", '');
}

var targetAudienceClrBt = document.getElementById("targetAudienceClrBt");
targetAudienceClrBt.onclick = function(){
    document.getElementById("targetAudienceInput").value = '';
    localStorage.setItem("targetAudienceInput", '');
}

var keywordsClrBt = document.getElementById("keywordsClrBt");
keywordsClrBt.onclick = function(){
    document.getElementById("keywordsInput").value = '';
    localStorage.setItem("keywordsInput", '');
}

var topicTextareaClrBt = document.getElementById("topicTextareaClrBt");
topicTextareaClrBt.onclick = function(){
    document.getElementById("topicTextarea").value = '';
    localStorage.setItem("topicTextarea", '');
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
    elements[elements.length-1] += '.';
    promptTextarea.value = elements.join(' ');
    localStorage.setItem("promptTextarea", promptTextarea.value);
}




var modelParamsGenPromptBt = document.getElementById("modelParamsGenPromptBt");
modelParamsGenPromptBt.onclick = function(){
    generatePrompt();
}

// var modelParamsGenArticleBt = document.getElementById("modelParamsGenArticleBt");


// Prompt Block
function generateSubtitles(){
    console.log('generateSubtitles');
    var apiKeyInput = document.getElementById('apiKeyInput').value;
    var subtitlesTextarea = document.getElementById('subtitlesTextarea');
    var numOfSubsInput = document.getElementById("numOfSubsInput").value;
    subtitlesTextarea.value = 'Generating...';
    var model = document.getElementById('modelSelect').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;
    var prompt = document.getElementById('promptTextarea').value;
    if (apiKeyInput.length==0){
        alert('You must specify the API Key.');
        return;
    }
    if (prompt.length==0){
        alert('Prompt cannot be empty.');
        return;
    }
    if ((numOfSubsInput===''||numOfSubsInput===0||numOfSubsInput==='0')&&prompt.length==0){
        alert('Number of subtitles must be set larger than 0.');
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4){
            // complete
            if (this.status === 200){
                var jsonObj = JSON.parse(this.responseText);
                console.log(jsonObj);
                // subtitlesTextarea.value = jsonObj.choices[0].text;
                var reg = /\d+\.(.*)/
                var subtitleStr = jsonObj.choices[0].text;
                var subtitles = subtitleStr.split("\n");
                var results = [];
                for (let i = 0; i < subtitles.length; i++) {
                    if (subtitles[i].length>0){
                        var matchResult = subtitles[i].match(reg);
                        if (matchResult!=null&&matchResult.length>=2){
                            results.push(matchResult[1].trim());
                        }
                    }
                }
                subtitlesTextarea.value = results.join("\n");
                localStorage.setItem("subtitlesTextarea", subtitlesTextarea.value);
            }else if (this.status === 400 || this.status === 401){
                subtitlesTextarea.value = '';
                alert(this.responseText);
            }
        }
    }
    xhttp.open("POST","https://api.openai.com/v1/completions");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + apiKeyInput);
    xhttp.send(JSON.stringify({
        "model": model,
        "temperature": parseFloat(temperature),
        "max_tokens": parseInt(maxToken),
        "frequency_penalty":parseFloat(freqPenalty),
        "presence_penalty": parseFloat(presencePenalty),
        "prompt": prompt
    }),true);

}

var promptCpBt = document.getElementById("promptCpBt");
promptCpBt.onclick = function(){
    navigator.clipboard.writeText(promptTextarea.value);
}

var promptClrBt = document.getElementById("promptClrBt");
promptClrBt.onclick = function(){
    promptTextarea.value='';
    localStorage.setItem("promptTextarea", '');
}

var promptGenSubsBt = document.getElementById("promptGenSubsBt");
promptGenSubsBt.onclick = function(){
    generateSubtitles();
}

// var promptGenArticleBt = document.getElementById("promptGenArticleBt");
// promptGenArticleBt.onclick = function(){
// }

// Subtitles Block
function subtitlesToArticle(){
    console.log("subtitlesToArticle");
    var genResultTextarea = document.getElementById("genResultTextarea");
    genResultTextarea.value = 'Generating...';

    var apiKeyInput = document.getElementById('apiKeyInput').value;
    var subtitlesTextarea = document.getElementById("subtitlesTextarea");
    var subtitles = subtitlesTextarea.value.split(/\r?\n/);
    var model = document.getElementById('modelSelect').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;
    // var prompt = document.getElementById('promptTextarea').value;

    var numOfSubsInput = document.getElementById("numOfSubsInput").value;
    var textType = document.getElementById("textTypeInput").value;
    textType = textType===''?'article':textType;
    var topic = document.getElementById("topicTextarea").value;
    var tone = document.getElementById("toneInput").value;
    var targetAudience = document.getElementById("targetAudienceInput").value;
    var keywords = document.getElementById("keywordsInput").value;

    var promiseList = [];
    // var result = [];
    for (let i = 0; i < subtitles.length; i++) {
        const subtitle = subtitles[i];
        // generate the prompt
        var elements = ['Expand the'];
        elements.push(textType);
        elements.push('section about');
        elements.push(topic);
        elements.push('under the topic of');
        elements.push(subtitle);
        elements.push('into');
        if (tone!==''){
            elements.push(tone);
        }
        elements.push('explanation');
        if (targetAudience!==''){
            elements.push('targeting the audience of');
            elements.push(targetAudience);
        }
        if (keywords!==''){
            elements.push('with keywords:');
            elements.push(keywords);
        }
        elements[elements.length-1] += '.';
        var subtitlePrompt = elements.join(' ');

        // send the prompt of one subtitle and append to result list
        // genResultTextarea.value = 'Generating '+(i+1)+'/'+subtitles.length+'...';
        
        promiseList.push(new Promise(function(resolve, reject){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if (this.readyState === 4){
                    if (this.status === 200){
                        var jsonObj = JSON.parse(this.responseText);
                        // result.push(jsonObj.choices[0].text);
                        resolve(jsonObj.choices[0].text);
                    }else if (this.status === 400 || this.status === 401){
                        // genResultTextarea.value = '';
                        // alert(this.responseText);
                        // return;
                        reject(this.responseText);
                    }
                }
            }
        
            xhttp.open("POST","https://api.openai.com/v1/completions");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.setRequestHeader("Authorization", "Bearer " + apiKeyInput);
            xhttp.send(JSON.stringify({
                "model": model,
                "temperature": parseFloat(temperature),
                "max_tokens": parseInt(maxToken),
                "frequency_penalty":parseFloat(freqPenalty),
                "presence_penalty": parseFloat(presencePenalty),
                "prompt": subtitlePrompt
            }),true);
        }))
    }

    Promise.all(promiseList).then(function(values){
        console.log(values)
        genResultTextarea.value = values.join('\n');
        localStorage.setItem("genResultTextarea", genResultTextarea.value);
    }).catch(function(reason){
        console.log(reason);
        genResultTextarea.value = '';
        localStorage.setItem("genResultTextarea", genResultTextarea.value);
        alert(reason);
    });

    // genResultTextarea.value = result.join('\n');


}

var subsCpBt = document.getElementById("subsCpBt");
subsCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("subtitlesTextarea").value);
}

var subsGenArticleBt = document.getElementById("subsGenArticleBt");
subsGenArticleBt.onclick = function(){
    subtitlesToArticle();
}

var subsClrBt = document.getElementById("subsClrBt");
subsClrBt.onclick = function(){
    document.getElementById("subtitlesTextarea").value = "";
    localStorage.setItem("subtitlesTextarea", '');
}


// Result Block

var genResultCpBt = document.getElementById("genResultCpBt");
genResultCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("genResultTextarea").value);
}

var genResultClrBt = document.getElementById("genResultClrBt");
genResultClrBt.onclick = function(){
    document.getElementById("genResultTextarea").value = "";
    localStorage.setItem("genResultTextarea", '');
}