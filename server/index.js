const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoute.js");
const messageRoutes = require("./routes/messages.js");

const app = express();
const socket = require("socket.io");
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGOS_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("MogoDB connection Successfuly");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log("Server running at", process.env.PORT);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3004",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
