const express = require("express")
const http = require('http')
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const dotenv = require('dotenv')
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
})

dotenv.config({ path: './config/.env'});

// app.set('view engine', 'ejs');
app.use('/peerjs', peerServer);

app.use(express.static('public'));

io.on('connection', socket =>{
    
    socket.on('join-room', (roomid, id)=>{
        socket.join(roomid);
        socket.to(roomid).broadcast.emit('user-connected', id);
        socket.on('send-message', (message)=>{
            io.to(roomid).emit('createMessage', {message, id});
        });
        socket.on('typing', (typing)=>{
            io.to(roomid).emit('isTyping', {id, typing});
        });
    });
    socket.on('leave-room', (roomid, id)=>{
        socket.to(roomid).leaveAll();
        socket.to(roomid).broadcast.emit('user-disconnected', id);
    }) 
});

const PORT = process.env.PORT || 8081
server.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
