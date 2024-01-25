import { useEffect, useState } from "react";
import "./chat.css"
const Chat = (props) => {
  // eslint-disable-next-line react/prop-types
  const { socket, userName, room } = props;
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    socket.on("receive-message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messagePayload = {
        room: room,
        author: userName,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()} : ${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      // eslint-disable-next-line react/prop-types
      await socket.emit("send-message", messagePayload);
      setMessages((list) => [...list, messagePayload]);
      setCurrentMessage("");
    }
  };
  return (
    <div>
      <div className="chat-window">
        <div className="chat-header">
          <h3>Live Chat</h3>
        </div>
        <div className="chat-body">
          <div className="message-container">
            {messages.map((message, index) => (
              <div
                className="message"
                key={index}
                id={userName === message.author ? "you" : "other"}
              >
                <div className="message-content">{message.message}</div>
                <div className="message-meta">
                  <p id="time">{message.time}</p>
                  <p id="author">{message.author === userName ? "you" : message.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
