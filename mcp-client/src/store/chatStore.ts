import {create} from 'zustand';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  uiState: {
    sidebarCollapsed: boolean;
  };
  toggleSidebar: () => void;
  loadChatHistory: () => void;
}

export const useAppStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  uiState: {
    sidebarCollapsed: false,
  },
  toggleSidebar: () =>
    set((state) => ({
      uiState: { ...state.uiState, sidebarCollapsed: !state.uiState.sidebarCollapsed },
    })),
  loadChatHistory: () => {
    // In a real app, you'd fetch this from an API
    console.log('Loading chat history...');
    // For now, we'll just add a welcome message.
    const history: Message[] = [
      { text: 'Welcome back!', sender: 'bot' },
    ];
    set({ messages: history });
  },
}));
