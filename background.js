let connection;

connection = new WebSocket("ws://localhost:8080");

connection.onopen = (event) => {
    connection.send("hoge");
}

connection.onmessage = (event) => {
    console.log("Server sent - " + event.data);
}