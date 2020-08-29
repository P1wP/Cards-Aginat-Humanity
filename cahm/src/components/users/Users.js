import React from "react";

const Users = ({users}) =>{
    console.log(users)
    return(
        <ul className="userList">
            {users.map((user, i) =>{
                return(
                    <li key={i} className="userList__item">{user.name}</li>
                )
            })}
        </ul>
    )
}
export default Users;