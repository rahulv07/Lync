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

let sourceID;
const sinkID = "100277740006456062513";
chrome.identity.getProfileUserInfo(function(browserUser){
  sourceID = browserUser.id;
});

const sinkBrowsers = document.getElementsByClassName("sinks");
for(var i=0;i<sinkBrowsers.length;i++){
  sinkBrowsers[i].addEventListener("click",function(event){
    sendLink(sourceID,sinkID);
  });
}