import React, { useState } from "react";
import { Input, Button, List, Avatar } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import { useAppStore } from "../store";
import { mcpService } from "../services/mcpService";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const { messages, addMessage } = useAppStore();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { content: inputValue, role: "user" as const };
    addMessage(userMessage);
    setInputValue("");

    try {
      const response = await mcpService.sendMessage(inputValue);
      const botMessage = {
        content: response.message,
        role: "assistant" as const,
      };
      addMessage(botMessage);
      // Here you would also handle the componentSchema to render the UI
    } catch (error) {
      const errorMessage = {
        content: "Error connecting to the server.",
        role: "assistant" as const,
      };
      addMessage(errorMessage);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                item.role === "user" ? (
                  <Avatar icon={<UserOutlined />} />
                ) : (
                  <Avatar icon={<RobotOutlined />} />
                )
              }
              title={item.role === "user" ? "You" : "Bot"}
              description={item.content}
            />
          </List.Item>
        )}
        style={{ flexGrow: 1, overflow: "auto", padding: "16px" }}
      />
      <div style={{ display: "flex", padding: "8px" }}>
        <Input
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onPressEnter={handleSendMessage}
          placeholder="Type your message..."
        />
        <Button
          onClick={handleSendMessage}
          type="primary"
          style={{ marginLeft: "8px" }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
