import React, { useState } from "react";
import { Link } from "react-router-dom";

function Join (){
    const [ name, setName ] = useState(""); // USER NAME
    const [ room, setRoom ] = useState(""); // GAME ROOM

    return(
        <div className="joinOuterContainer">
            <div className="JoinInnerContainer">
                <h1 className="heading">JOIN</h1>
                <div>
                    <input 
                        placeholder="Name" 
                        className="joinInput" 
                        type="text" 
                        onChange={(event)=> setName(event.target.value)}
                    ></input>
                </div>

                <div>
                    <input 
                        placeholder="Room" 
                        className="joinInput" 
                        type="text" 
                        onChange={(event)=> setRoom(event.target.value)}
                    ></input>
                </div>

                <Link onClick={event => (!name || !room) ? event.preventDefault() : null } to={ '/chat?name=' + name + '&room=' + room}>
                    <button className="joinBtn" type="submit">Submit</button>
                </Link>
            </div>
        </div>
    
    );
}

export default Join;