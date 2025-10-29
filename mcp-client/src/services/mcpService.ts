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
    const response = await axios.post(`${API_URL}/orchestrate`, {
      message,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  }
}

export const mcpService = new MCPService();
