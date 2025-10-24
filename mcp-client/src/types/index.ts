export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  componentSchema?: ComponentSchema;
}

export interface ComponentSchema {
  type: 'text' | 'form' | 'table' | 'chart' | 'grid' | 'tabs' | 'card' | 'list' | 'custom';
  id: string;
  props?: Record<string, any>;
  children?: ComponentSchema[];
  layout?: {
    columns?: number;
    gap?: number;
    responsive?: boolean;
  };
}

export interface DynamicPage {
  id: string;
  path: string;
  title: string;
  icon?: string;
  component: ComponentSchema;
  createdAt: Date;
}

export interface MCPSession {
  id: string;
  active: boolean;
  connections: string[];
  metadata: Record<string, any>;
}

export interface UIState {
  footerChatOpen: boolean;
  sidebarCollapsed: boolean;
  currentView: 'canvas' | 'split' | 'fullscreen';
}

export interface AppStore {
  messages: ChatMessage[];
  currentPage: ComponentSchema | null;
  dynamicPages: DynamicPage[];
  mcpSession: MCPSession | null;
  uiState: UIState;
  
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setCurrentPage: (schema: ComponentSchema | null) => void;
  addDynamicPage: (page: Omit<DynamicPage, 'id' | 'createdAt'>) => void;
  removeDynamicPage: (id: string) => void;
  toggleFooterChat: () => void;
  toggleSidebar: () => void;
  setUIState: (state: Partial<UIState>) => void;
  clearMessages: () => void;
  loadChatHistory: () => void;
}
