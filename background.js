let connection;
let sourceID;

chrome.identity.getProfileUserInfo(function(browserUser){
    sourceID = browserUser.id;
});

connection = new WebSocket("wss://lync-api.glitch.me");

connection.onopen = (event) => {
    console.log("Connected to server.");

    const initialSetupData = {
        "initial" : true,
        "sourceID" : sourceID
    }

    try{
        connection.send(JSON.stringify(initialSetupData));
    }
    catch(error){
        console.log("Error sending initial setup data\n", error);
    }
}

connection.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const senderID = data["sourceID"];

    chrome.storage.local.get({lyncSavedSources:[]},(result) => {
        var lyncSavedSources = result.lyncSavedSources;
        var alreadySaved = false;

        for(let i in lyncSavedSources){
            if(lyncSavedSources[i].sourceID == senderID){
                alreadySaved = true;
                break;
            }
        }

        if(alreadySaved){
            chrome.tabs.create({url:data["link"]});
        }
        else{
            const canPair = confirm("Receive links from browser " + senderID + "?");
            if(canPair){
                const nickName = prompt("Enter nickname for browser " + senderID);
                lyncSavedSources.push({sourceID:senderID,nickName:nickName});
                chrome.storage.local.set({lyncSavedSources:lyncSavedSources}, () => {
                    chrome.tabs.create({url:data["link"]});
                });         
            }
        }
    });   
}

chrome.runtime.onMessage.addListener(function(tabData,sender,res){
    try{
        connection.send(JSON.stringify(tabData));
        res({status:"SUCCESS"});
    }
    catch(error){
        res({status:"ERROR"});
    }
});