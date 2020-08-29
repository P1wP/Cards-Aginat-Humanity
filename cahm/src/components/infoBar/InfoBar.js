import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

const InfoBar = ({roomName}) =>{
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="Online"/>
                <h3>{roomName}</h3>
            </div>
            <div className="rightInnerContainer">
                <a className="closeLink" href="/"><img className="closeIcon" src={closeIcon} alt="close window" /></a>

            </div>
        </div>
    );
}

export default InfoBar;