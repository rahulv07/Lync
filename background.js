let connection;

connection = new WebSocket("ws://localhost:8080");


connection.onopen = (event) => {
    console.log("Connected to server.");
}

connection.onmessage = (event) => {
    console.log(event.data);
}