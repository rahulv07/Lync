let connection;
var sourceID = "sdfa";

connection = new WebSocket("ws://localhost:8080");

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
    console.log(event.data);
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