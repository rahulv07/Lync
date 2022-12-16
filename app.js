let sourceID;

chrome.identity.getProfileUserInfo(function(browserUser){
  sourceID = browserUser.id;
});

function loadSinkNames(){
  var currentDiv = document.getElementsByClassName("paired")[0];

  chrome.storage.local.get((result) => {
    const lyncSavedSources = result.lyncSavedSources;

    for(var i in lyncSavedSources){
      const sinkDiv = document.createElement("div");
      sinkDiv.setAttribute("class","sinks");
    
      const sinkName = document.createElement("p").appendChild(document.createTextNode(lyncSavedSources[i].nickName));
      sinkDiv.appendChild(sinkName);

      sinkDiv.addEventListener("click",(event) => {
        sendLink(sourceID,lyncSavedSources[i].sourceID);
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
        alert("Link Sent!");
      }
      else{
        alert("Error sending the link!");
      }
    });
  }); 
}

document.body.onload = loadSinkNames;