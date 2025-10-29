import React, { useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import { useChatStore } from '../store';
import { mcpService } from '../services/mcpService';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, addMessage } = useChatStore();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    addMessage(userMessage);
    setInputValue('');

    try {
      const response = await mcpService.sendMessage(inputValue);
      const botMessage = { text: response.message, sender: 'bot' };
      addMessage(botMessage);
      // Here you would also handle the componentSchema to render the UI
    } catch (error) {
      const errorMessage = { text: 'Error connecting to the server.', sender: 'bot' };
      addMessage(errorMessage);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.sender === 'user' ? <Avatar icon={<UserOutlined />} /> : <Avatar icon={<RobotOutlined />} />}
              title={item.sender === 'user' ? 'You' : 'Bot'}
              description={item.text}
            />
          </List.Item>
        )}
        style={{ flexGrow: 1, overflow: 'auto', padding: '16px' }}
      />
      <div style={{ display: 'flex', padding: '8px' }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type your message..."
        />
        <Button onClick={handleSendMessage} type="primary" style={{ marginLeft: '8px' }}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
