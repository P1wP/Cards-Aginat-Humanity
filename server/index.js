const express = require('express');
const socektio = require('socket.io');
const http = require('http');
const cors = require('cors');

// FUNCTIONS FROM USER.JS
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socektio(server);

app.use(router);
app.use(cors());

// USER CONNECTS
io.on('connection', (socket) => {
    console.log("We have a new connection");

    socket.on('Join', ({name, room}, callback)=>{
        const {error, user} = addUser( {id:socket.id, name, room} );
        if( error ) return callback(error);

        socket.emit('message', {user: 'admin', text: user.name + ' Welcome to the Room ' + user.room})  // WELCOME USER
        socket.broadcast.to(user.room).emit('message', { user:'admin', text: user.name + ' Has Joined'}); // TELLS CHANNEL USER HAS JOINED

        socket.join(user.room)

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback();
    });

    socket.on('disconnect', () => {
        console.log("User disconected");   
        const user = removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: user.name + 'has left.'})
        }
    })
})




server.listen(PORT, ()=> console.log('server has started on Port: ' + PORT) );