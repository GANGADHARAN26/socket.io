import { useState } from "react";
import Chat from './../Chat/Chat';
import "./joinChat.css"
const JoinChat = (props) => {
  // eslint-disable-next-line react/prop-types
  const {socket}=props
  const [userName,setUserName]=useState("");
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false);
  const joinRoom=()=>{
    if(userName && room){
      // eslint-disable-next-line react/prop-types
      socket.emit("join-room",room)
      console.log("joining the room...");
      setShowChat(true);
    }
  }
  return (
    <div>
     {
      !showChat ? (
        <div className="joinchat-container">
        <h2>Join the chat room</h2>
        <input type="text" placeholder="Enter your username" onChange={(e)=> setUserName(e.target.value)}/>
        <input type="text" placeholder="Enter your room ID" onChange={(e)=> setRoom(e.target.value)}/>
        <button onClick={joinRoom}>Join Room</button>
      </div>
      ) : (<Chat socket={socket} userName={userName} room={room}/>)
     }
    </div>
  )
}

export default JoinChat