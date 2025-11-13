import express from "express";

const app = express();

import http from "http";

import { Server } from "socket.io";
import { ACTIONS } from "./actions.js";

const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId: socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

// socket listener
io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  // Listening to join action from the socket io client
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId); // this will join the socket, with socket.id, to a room with id roomId. If the roomId does not exists, it will create a new roomId and then join

    //Get all the connected clients in the room
    const clients = getAllConnectedClients(roomId);

    //Notifying all the other clients about the user has joined using their socket id
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clientList: clients, // All yhe clients in the room with id roomId
        username, //The user wo has joined
        socketId: socket.id, // socket id of the user who has joined
      });
    });
  });
});

server.listen(5000, () => {
  console.log("Server listening at PORT 5000");
});

// In sockets, we can listen to any event using on() and we send data for an event using emit()
