let sourceID;

chrome.identity.getProfileUserInfo(function(browserUser){
  sourceID = browserUser.id;
  document.getElementsByClassName("browserID")[0].textContent = "ID: " + sourceID;
});

document.getElementsByTagName("i")[0].addEventListener("click",(event)=>{
  const sinkBrowserID = prompt("Enter the browser ID");
  if(sinkBrowserID != null){
    const nickName = prompt("Enter nickname for browser " + sinkBrowserID);
    if(nickName != null){
      chrome.storage.local.get({lyncSavedSources:[]},(result) => {
        var lyncSavedSources = result.lyncSavedSources;
        lyncSavedSources.push({sourceID:sinkBrowserID,nickName:nickName});
        chrome.storage.local.set({lyncSavedSources:lyncSavedSources},()=>{
          window.close();
        });
      });
    }
  }
});

function removeBrowser(browserID){
  chrome.storage.local.get({lyncSavedSources:[]},(result) => {
    var lyncSavedSources = result.lyncSavedSources;
    for(var b in lyncSavedSources){
      if(lyncSavedSources[b].sourceID == browserID){
        lyncSavedSources.splice(b,1);
        break;
      }
    }
    chrome.storage.local.set({lyncSavedSources:lyncSavedSources},()=>{
      window.close();
    })
  });
}

function loadSinkNames(){
  var currentDiv = document.getElementsByClassName("paired")[0];

  chrome.storage.local.get((result) => {
    const lyncSavedSources = result.lyncSavedSources;

    for(var i in lyncSavedSources){
      const sinkDiv = document.createElement("div");
      sinkDiv.setAttribute("class","sinks");
    
      const sinkNameSpan = document.createElement("span");
      sinkNameSpan.setAttribute("class","sinkName");      
      sinkNameSpan.appendChild(document.createElement("p").appendChild(document.createTextNode(lyncSavedSources[i].nickName)));
      sinkDiv.appendChild(sinkNameSpan);

      const trashIconSpan = document.createElement("span");
      const trashIcon = document.createElement("i");
      trashIcon.setAttribute("class","trashIcon fa-solid fa-trash");
      trashIconSpan.appendChild(trashIcon);
      sinkDiv.appendChild(trashIconSpan);

      sinkNameSpan.addEventListener("click",(event) => {
        sendLink(sourceID,lyncSavedSources[i].sourceID);
      });

      trashIcon.addEventListener("click",(event) => {
        removeBrowser(lyncSavedSources[i].sourceID);
      });

      currentDiv.after(sinkDiv);
      currentDiv = sinkDiv; 
    }  
  });
  
}

function sendLink(sourceID,sinkID) {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, async (tabs) => {
    let url = tabs[0].url;

    const data = {
      "initial" : false,
      "sourceID" : sourceID,
      "sinkID" : sinkID,
      "url" : url
    };

    chrome.runtime.sendMessage(data,(res)=>{
      if(res.status == "SUCCESS"){
        window.close();
      }
      else{
        alert("Error sending the link!");
      }
    });
  }); 
}

document.body.onload = loadSinkNames;