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

// Configurations Block

var toneClrBt = document.getElementById("toneClrBt");
toneClrBt.onclick = function(){
    document.getElementById("toneInput").value = '';
}

var targetAudienceClrBt = document.getElementById("targetAudienceClrBt");
targetAudienceClrBt.onclick = function(){
    document.getElementById("targetAudienceInput").value = '';
}

//Email Content Block

var contentCpBt = document.getElementById("contentCpBt");
contentCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("contentTextarea").value);
}

var contentClrBt = document.getElementById("contentClrBt")
contentClrBt.onclick = function(){
  document.getElementById("contentTextarea").value = '';
}


// Prompt Block

function generatePrompt(){
    console.log("generatePrompt");

    var tone = document.getElementById("toneInput").value;
    var targetAudience = document.getElementById("targetAudienceInput").value;
    var emailContent = document.getElementById("contentTextarea").value;

    if (emailContent===''){
        alert('You must input email content!');
        return;
    }

    var elements = []
    elements = ['Respond to the following email text']
    if (tone!==''){
      elements.push('in');
      elements.push(tone);
      elements.push('tone');
    }
    if (targetAudience!==''){
        elements.push('targeting the audience of');
        elements.push(targetAudience);
    }

    elements.push(', email text:"')
    elements.push(emailContent)
    elements.push('".')

    promptTextarea.value = elements.join(' ');
}

var genPromptBt = document.getElementById("genPromptBt");
genPromptBt.onclick = function(){
    generatePrompt();
}


// Result Block
function generateReply(){
    console.log('generateSubtitles');
    var apiKeyInput = document.getElementById('apiKeyInput').value;
    var resultTextarea = document.getElementById('genResultTextarea');
    // var numOfSubsInput = document.getElementById("numOfSubsInput").value;
    resultTextarea.value = 'Generating...';
    var model = document.getElementById('modelSelect').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;
    var prompt = document.getElementById('promptTextarea').value;
    if (prompt.length==0){
        alert('Prompt cannot be empty.');
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4){
            // complete
            if (this.status === 200){
                var jsonObj = JSON.parse(this.responseText);
                console.log(jsonObj);
                var resultStr = jsonObj.choices[0].text;
                resultTextarea.value = resultStr;
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
}

var promptGenReplyBt = document.getElementById("promptGenReplyBt");
promptGenReplyBt.onclick = function(){
    generateReply();
}


// Result Block

var genResultCpBt = document.getElementById("genResultCpBt");
genResultCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("genResultTextarea").value);
}

var genResultClrBt = document.getElementById("genResultClrBt");
genResultClrBt.onclick = function(){
    document.getElementById("genResultTextarea").value = "";
}
