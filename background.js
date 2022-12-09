let connection;

connection = new WebSocket("ws://localhost:8080");

connection.onopen = (event) => {
    console.log("Connected to server.");
}

connection.onmessage = (event) => {
    console.log(event.data);
}

chrome.runtime.onMessage.addListener(function(data,sender,res){
    try{
        connection.send(JSON.stringify(data));
        res({status:"SUCCESS"});
    }
    catch(error){
        res({status:"ERROR"});
    }
});