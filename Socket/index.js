const io = require("socket.io")(8900, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

let users = [];

//method for add user to the array
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
    users.push({userId, socketId});
}

//method for remove user from the array
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

//method for get specific user to send message
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
    console.log("a user connected"); 
    
    //take user id and socketId from user and push it into the array
    socket.on("addUser", (userId) => {
       addUser(userId, socket.id);
       io.emit("getUsers", users);
    })

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
       const user = getUser(receiverId);
       io.to(user.socketId).emit("getMessage", {
        senderId, 
        text
       })
    })

    //event for remove the offline users from the array
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});