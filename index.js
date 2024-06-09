const express = require('express');
const socket = require("socket.io");
const http = require("http");
const { connections } = require('./DB/db');

const app = express();
app.use(express.json());
const path = require("path");
const server = http.createServer(app);

const io = socket(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index", { title: "Chat App" });
});

io.on("connection", (socket) => {
    console.log("user is connected");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(8000, async () => {
    try {
        console.log("server is running at port 8000");
        await connections;
        console.log("database is connected");
    } catch (error) {
        console.log(error);
    }
});
