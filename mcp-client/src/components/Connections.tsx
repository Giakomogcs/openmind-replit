import React from 'react';
import { Database, Plus, Settings } from 'lucide-react';
import './Connections.css';

const Connections: React.FC = () => {
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
        <button className="add-connection-btn">
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
        <button className="add-connection-btn-large">
          <Plus size={24} />
          <span>Adicionar Primeira Conexão</span>
        </button>
      </div>
    </div>
  );
};

export default Connections;
