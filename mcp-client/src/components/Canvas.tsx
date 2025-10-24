import React from 'react';
import { useAppStore } from '../store';
import { DynamicRenderer } from './dynamic/DynamicRenderer';
import { Sparkles } from 'lucide-react';
import './Canvas.css';

const Canvas: React.FC = () => {
  const { currentPage } = useAppStore();

  return (
    <div className="canvas-page">
      {currentPage ? (
        <div className="canvas-content">
          <DynamicRenderer schema={currentPage} />
        </div>
      ) : (
        <div className="canvas-empty">
          <Sparkles size={64} />
          <h2>Área de Trabalho</h2>
          <p>
            Use o chat para criar interfaces dinâmicas que serão renderizadas aqui.
          </p>
          <div className="suggestions">
            <h4>Experimente comandos como:</h4>
            <ul>
              <li>"Crie um dashboard com métricas"</li>
              <li>"Mostre uma tabela de dados"</li>
              <li>"Gere um formulário de contato"</li>
              <li>"Exiba um gráfico de vendas"</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;
