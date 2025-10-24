import React from 'react';
import { useAppStore } from '../store';
import { DynamicRenderer } from './dynamic/DynamicRenderer';
import { Folder, Trash2, Calendar } from 'lucide-react';
import './Collections.css';

const Collections: React.FC = () => {
  const { dynamicPages, removeDynamicPage } = useAppStore();

  const handleDeletePage = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      removeDynamicPage(id);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="collections-page">
      <div className="collections-header">
        <div className="header-content">
          <Folder size={32} />
          <div>
            <h2>Collections</h2>
            <p>Páginas e sistemas criados pelo MCP Assistant</p>
          </div>
        </div>
      </div>

      {dynamicPages.length === 0 ? (
        <div className="empty-collections">
          <Folder size={64} />
          <h3>Nenhuma collection ainda</h3>
          <p>
            Use o chat para criar páginas dinâmicas e sistemas completos.
            Eles aparecerão aqui!
          </p>
          <small>
            Experimente: "Crie um dashboard de vendas" ou "Crie um formulário de contato"
          </small>
        </div>
      ) : (
        <div className="collections-grid">
          {dynamicPages.map((page) => (
            <div key={page.id} className="collection-card">
              <div className="collection-header">
                <h3>{page.title}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDeletePage(page.id, page.title)}
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="collection-meta">
                <Calendar size={14} />
                <span>{formatDate(page.createdAt)}</span>
              </div>

              <div className="collection-path">
                <code>{page.path}</code>
              </div>

              <div className="collection-preview">
                <DynamicRenderer schema={page.component} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
