import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useContext from "../../hooks/context";
import styles from "./ai_chat.module.css";
import { Button } from "@mantine/core";

function AiChat() {
  const context = useContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  //  messages for testing purposes
  const fakeMessages = [
    { text: "Hello! How can I help you today?", sender: "ai" },
    {
      text: "Hi there! I'm just testing out this chat feature.",
      sender: "user",
    },
    {
      text: "I'm glad you're testing it out! Let me know if you have any questions.",
      sender: "ai",
    },
    { text: "Sure thing! Thanks for your help.", sender: "user" },
  ];

  // useEffect to populate initial fake messages
  useEffect(() => {
    setMessages(fakeMessages);
  }, []);

  // handle sending user messages
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
    }
  };

  return (
    <div className="w-screen flex flex-col items-center">
      <div className={styles.chatContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.messageContainer} ${
              message.sender === "user" ? styles.userMessage : styles.aiMessage
            }`}
          >
            <div className={styles.messageBubble}>{message.text}</div>
          </div>
        ))}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className={styles.inputContainer}
          placeholder="Message AI..."
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
        <Button>test</Button>
      </div>
    </div>
  );
}

export default AiChat;
