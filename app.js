let sourceID;
chrome.identity.getProfileUserInfo(function(browserUser){
  sourceID = browserUser.id;
});

var sinkID = "100277740006456062513";

// //If sinkBrowser is already paired to sourceBrowser
// chrome.storage.local.set({sinkID:"ALREADY_PAIRED"},()=>{});

// chrome.storage.local.get(sinkID,(items)=>{
//   console.log(items[sinkID]);  //Prints already paired or not
// });

chrome.tabs.query({active: true, lastFocusedWindow: true}, async (tabs) => {
    let url = tabs[0].url;
    document.querySelector("h6").textContent = url;

    const data = {
      "initial" : false,
      "sourceID" : sourceID,
      "sinkID" : sinkID,
      "url" : url
    };

    chrome.runtime.sendMessage(data,(res)=>{
      if(res.status == "SUCCESS"){
        document.querySelector("h5").textContent = "Sent!";
      }
      else{
        document.querySelector("h5").textContent = "Error Sending";
      }
    });   
}); 