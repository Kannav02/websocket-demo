import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

// initialize a server
const httpServer = app.listen(8080);

// initialise the web socket capability to the server
const wss = new WebSocketServer({ server: httpServer });

// wss - web socket server , so whenever a clietn connects to the server , the connection callback is called
//  where ws is the web server on which the socket is connected
wss.on("connection", function connnection(ws) {
  ws.on("error", (error) => {
    console.log(error);
  });
  //   when ws recieves a message call the callback message
  ws.on("message", function message(ws, isBinary) {
    // for each connected client , transmit the message to each client
    wss.clients.forEach(function each(client) {
      // only if the client is open to take connections
      if (client.readyState === WebSocket.OPEN) {
        client.send("Hello From Kannav", { binary: isBinary });
      }
    });
  });
});
