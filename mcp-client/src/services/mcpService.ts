import axios from 'axios';
import { ComponentSchema } from '../types';

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
    const response = await axios.post(`/api/orchestrate`, {
      message,
      timestamp: new Date().toISOString(),
      projectId: 1, // Hardcoded for now
    });
    return response.data;
  }
}

export const mcpService = new MCPService();
