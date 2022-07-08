const app = require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary")

connectDatabase()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_key,
    api_secret : process.env.CLOUDINARY_SECRET,
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

//sample 5
const io = require("socket.io")(server, {
    
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
        
    },
});

let users = [];
const addUser = (userId,socketId) => {
    !users.some((user)=>user.userId === userId) &&
    users.push({userId,socketId})
}
const removeUser = (socketId) =>{
    users = users.filter((user)=>user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user)=>user.userId === userId)
}

io.on("connection", (socket) => {

    //when connect
    console.log("a user connected here.");

    //take userId socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        // console.log(users);
        io.emit("getUsers",JSON.stringify(users))

    });

    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId);

        io.to(user?.socketId).emit("getMessage",{
            sender:senderId,
            text
        })

    })

    //when disconnect
    socket.on("disconnect",()=>{
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers",JSON.stringify(users))

    })
})
