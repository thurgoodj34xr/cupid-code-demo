import { TextInput, rem, useMantineTheme } from "@mantine/core";
import { IconArrowRight, IconMessage } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useContext from "../../hooks/context";
import styles from "./ai_chat.module.css";
import useAI from "../../hooks/useAI";

function AiChat() {
  const { send } = useAI();
  const theme = useMantineTheme();
  const context = useContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
    }
    AiMessage(inputMessage);
  };

  const AiMessage = async (message) => {
    const aiResp = await send(message);
    setMessages((old) => [...old, { text: aiResp, sender: "ai" }]);
  };

  //  messages for testing purposes
  const fakeMessages = [
    { text: "Hello! How can I help you today?", sender: "ai" },
  ];

  // useEffect to populate initial fake messages
  useEffect(() => {
    setTimeout(() => {
      setMessages(fakeMessages);
    }, 500);
  }, []);

  // handle sending user messages

  return (
    <div className="w-screen flex flex-col items-center gap-4">
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
        <TextInput
          className="w-full"
          radius="xl"
          size="lg"
          placeholder="Send a message..."
          rightSectionWidth={42}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          leftSection={
            <IconMessage
              style={{ width: rem(18), height: rem(22) }}
              stroke={1.5}
            />
          }
          rightSection={
            <div
              className="bg-blue p-2 rounded-full cursor-pointer"
              onClick={sendMessage}
            >
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
                color="white"
              />
            </div>
          }
        />
        {/* <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className={styles.inputContainer}
          placeholder="Message AI..."
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button> */}
      </div>
    </div>
  );
}

export default AiChat;
