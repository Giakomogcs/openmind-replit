import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader, Trash2 } from "lucide-react";
import { useAppStore } from "../store";
import { mcpService } from "../services/mcpService";
// @ts-ignore
import "./FooterChat.css";

const FooterChat: React.FC = () => {
  const { messages, uiState, addMessage, toggleFooterChat, clearMessages } =
    useAppStore();

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (uiState.footerChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [uiState.footerChatOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    addMessage({
      role: "user",
      content: userMessage,
    });

    setIsLoading(true);

    try {
      const response = await mcpService.sendMessage(userMessage);

      addMessage({
        role: "assistant",
        content: response.message,
        componentSchema: response.componentSchema,
      });

      if (response.createPage && response.componentSchema) {
        useAppStore.getState().addDynamicPage({
          path: response.createPage.path,
          title: response.createPage.title,
          icon: response.createPage.icon,
          component: response.componentSchema,
        });
      }
    } catch (error) {
      addMessage({
        role: "system",
        content: "Erro ao processar sua mensagem. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`footer-chat ${uiState.footerChatOpen ? "open" : "closed"}`}
    >
      <div className="footer-chat-header" onClick={toggleFooterChat}>
        <div className="header-left">
          <MessageCircle size={20} />
          <span className="header-title">MCP Assistant</span>
          {messages.length > 0 && !uiState.footerChatOpen && (
            <span className="message-badge">{messages.length}</span>
          )}
        </div>
        <div className="header-actions">
          {uiState.footerChatOpen && messages.length > 0 && (
            <button
              className="clear-button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                if (window.confirm("Limpar todo o histórico de chat?")) {
                  clearMessages();
                }
              }}
              title="Limpar histórico"
            >
              <Trash2 size={16} />
            </button>
          )}
          {uiState.footerChatOpen ? (
            <X size={20} />
          ) : (
            <MessageCircle size={20} />
          )}
        </div>
      </div>

      {uiState.footerChatOpen && (
        <div className="footer-chat-content">
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <MessageCircle size={48} />
                <p>Comece uma conversa!</p>
                <small>
                  Digite uma mensagem para criar interfaces dinâmicas
                </small>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`message ${message.role}`}>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    {message.componentSchema && (
                      <div className="schema-indicator">
                        ✨ Componente renderizado na tela principal
                      </div>
                    )}
                  </div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message assistant loading">
                <div className="message-content">
                  <Loader className="spinner" size={20} />
                  <span>Processando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem... (ex: 'crie um dashboard')"
              disabled={isLoading}
              className="chat-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
              title="Enviar mensagem"
            >
              {isLoading ? (
                <Loader className="spinner" size={20} />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterChat;
