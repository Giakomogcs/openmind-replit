import axios from 'axios';
import { ComponentSchema } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface MCPResponse {
  message: string;
  componentSchema?: ComponentSchema;
  createPage?: {
    path: string;
    title: string;
    icon?: string;
  };
  data?: any;
}

class MCPService {
  async sendMessage(message: string): Promise<MCPResponse> {
    try {
      const response = await axios.post(`${API_URL}/orchestrate`, {
        message,
        timestamp: new Date().toISOString(),
      });
      
      return response.data;
    } catch (error) {
      console.error('MCP API Error:', error);
      
      return this.getMockResponse(message);
    }
  }

  private getMockResponse(message: string): MCPResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('painel')) {
      return {
        message: 'Aqui está um dashboard com métricas importantes.',
        componentSchema: {
          type: 'grid',
          id: 'dashboard-main',
          layout: { columns: 2, gap: 20, responsive: true },
          children: [
            {
              type: 'card',
              id: 'card-users',
              props: {
                title: 'Usuários Ativos',
                value: '1,234',
                icon: 'users',
                trend: '+12%',
              },
            },
            {
              type: 'card',
              id: 'card-revenue',
              props: {
                title: 'Receita',
                value: 'R$ 45,678',
                icon: 'dollar-sign',
                trend: '+8%',
              },
            },
            {
              type: 'chart',
              id: 'chart-activity',
              props: {
                title: 'Atividade nos Últimos 7 Dias',
                data: [
                  { name: 'Seg', value: 400 },
                  { name: 'Ter', value: 300 },
                  { name: 'Qua', value: 600 },
                  { name: 'Qui', value: 800 },
                  { name: 'Sex', value: 500 },
                  { name: 'Sáb', value: 200 },
                  { name: 'Dom', value: 100 },
                ],
                chartType: 'line',
              },
            },
            {
              type: 'table',
              id: 'table-recent',
              props: {
                title: 'Atividades Recentes',
                columns: ['Usuário', 'Ação', 'Data'],
                data: [
                  ['João Silva', 'Login', '2025-10-24 19:00'],
                  ['Maria Santos', 'Upload', '2025-10-24 18:45'],
                  ['Pedro Costa', 'Download', '2025-10-24 18:30'],
                ],
              },
            },
          ],
        },
      };
    }
    
    if (lowerMessage.includes('formulário') || lowerMessage.includes('form')) {
      return {
        message: 'Criei um formulário para você.',
        componentSchema: {
          type: 'form',
          id: 'form-contact',
          props: {
            title: 'Formulário de Contato',
            fields: [
              { name: 'name', label: 'Nome', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'message', label: 'Mensagem', type: 'textarea', required: true },
            ],
            submitLabel: 'Enviar',
          },
        },
      };
    }
    
    if (lowerMessage.includes('tabela') || lowerMessage.includes('table')) {
      return {
        message: 'Aqui está uma tabela com dados.',
        componentSchema: {
          type: 'table',
          id: 'table-data',
          props: {
            title: 'Lista de Dados',
            columns: ['ID', 'Nome', 'Status', 'Data'],
            data: [
              ['001', 'Item A', 'Ativo', '2025-10-24'],
              ['002', 'Item B', 'Pendente', '2025-10-23'],
              ['003', 'Item C', 'Ativo', '2025-10-22'],
              ['004', 'Item D', 'Inativo', '2025-10-21'],
            ],
            searchable: true,
            sortable: true,
          },
        },
      };
    }
    
    return {
      message: 'Entendi! Você pode me pedir para criar dashboards, formulários, tabelas, gráficos e muito mais. Experimente dizer: "crie um dashboard" ou "mostre uma tabela de dados".',
      componentSchema: {
        type: 'text',
        id: 'help-text',
        props: {
          content: 'Olá! Sou o assistente MCP. Posso criar interfaces dinâmicas para você. Tente comandos como:\n\n• "Crie um dashboard"\n• "Mostre um formulário"\n• "Gere uma tabela de dados"\n\nVou renderizar os componentes aqui na tela principal!',
        },
      },
    };
  }
}

export const mcpService = new MCPService();
