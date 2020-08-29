import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
//import users from "../../../../server/users";
import InfoBar from "../infoBar/InfoBar";
import Messages from "../messages/Messages";
import Input from "../input/Input";
import Users from "../users/Users";


let socket;


function Chat( { location } ){
    const [ name, setName ] = useState("");
    const [ room, setRoom ] = useState("");
    const [ users, setUsers ] = useState([]);
    const [ messages, setMessages ] = useState([]); // ALL MESSAGES
    const [ message, setMessage ] = useState("");   // SINGLE MESSAGE
    const ENDPOINT = "localhost:5000";

    useEffect(()=>{
        const { name, room } = queryString.parse(location.search) // GET NAME AND ROOM

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('Join', {name, room}, ()=>{
            // ERROR HANDELING
        })

        return ()=>{
            socket.emit('disconnect');

            socket.off(); // TURN OF USERS SOCKET
        }
        
    }, [ENDPOINT, location.search]) // ONLY IF THESE CHANGES

    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message]); // SPRED MESSAGES, ADD NEW MESSAGE
            
        })

        socket.on('roomData', ({ users }) =>{
            setUsers(users);
        })
    }, [messages])

    // FUNCTION FOR SENDING MESSAGES
    const sendMessage = (event)=>{
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return(
        <>
        <h1>CHAT</h1>
            <Users users={users}/>

            <div className="outerContainer">
                <div className="container">
                    <InfoBar roomName={room}/>
                    <Messages messages = {messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>

            </div>

        </>
    )
};

export default Chat;