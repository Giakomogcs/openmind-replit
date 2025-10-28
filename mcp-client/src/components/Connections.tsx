import React, { useState } from 'react';
import { Database, Plus, X } from 'lucide-react';
import './Connections.css';

const Connections: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeAmigavel, setNomeAmigavel] = useState('');
  const [adapterUrl, setAdapterUrl] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form fields
    setNomeAmigavel('');
    setAdapterUrl('');
    setUser('');
    setPassword('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const connectionData = {
      nomeAmigavel,
      adapterUrl,
      credentials: {
        user,
        password,
      },
    };

    try {
      const response = await fetch('/api/connections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionData),
      });

      if (response.ok) {
        // Handle successful connection creation
        console.log('Connection created successfully');
        closeModal();
      } else {
        // Handle error
        console.error('Failed to create connection');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="connections-page">
      <div className="connections-header">
        <div className="header-content">
          <Database size={32} />
          <div>
            <h2>Connections</h2>
            <p>Gerencie suas conexões com APIs e bancos de dados</p>
          </div>
        </div>
        <button className="add-connection-btn" onClick={openModal}>
          <Plus size={20} />
          <span>Nova Conexão</span>
        </button>
      </div>

      <div className="connections-empty">
        <Database size={64} />
        <h3>Nenhuma conexão configurada</h3>
        <p>
          Adicione conexões com APIs RESTful ou bancos de dados PostgreSQL
          para que o MCP Assistant possa interagir com elas.
        </p>
        <button className="add-connection-btn-large" onClick={openModal}>
          <Plus size={24} />
          <span>Adicionar Primeira Conexão</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Nova Conexão</h3>
              <button onClick={closeModal} className="close-btn">
                <X size={24} />
              </button>
            </div>
            <form className="connection-form" onSubmit={handleSubmit}>
              <label htmlFor="nomeAmigavel">Nome Amigável</label>
              <input
                type="text"
                id="nomeAmigavel"
                value={nomeAmigavel}
                onChange={(e) => setNomeAmigavel(e.target.value)}
              />

              <label htmlFor="adapterUrl">URL da API</label>
              <input
                type="text"
                id="adapterUrl"
                value={adapterUrl}
                onChange={(e) => setAdapterUrl(e.target.value)}
              />

              <label htmlFor="user">Usuário (Opcional)</label>
              <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />

              <label htmlFor="password">Senha (Opcional)</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="submit-btn">Criar Conexão</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
