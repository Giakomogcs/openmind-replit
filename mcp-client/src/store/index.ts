import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppStore, ChatMessage, ComponentSchema, DynamicPage, UIState } from '../types';

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      messages: [],
      currentPage: null,
      dynamicPages: [],
      mcpSession: null,
      uiState: {
        footerChatOpen: false,
        sidebarCollapsed: false,
        currentView: 'canvas',
      },

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        };
        
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));

        if (newMessage.componentSchema) {
          get().setCurrentPage(newMessage.componentSchema);
        }

      },

      setCurrentPage: (schema) => {
        set({ currentPage: schema });
      },

      addDynamicPage: (page) => {
        const newPage: DynamicPage = {
          ...page,
          id: `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
        };
        
        set((state) => ({
          dynamicPages: [...state.dynamicPages, newPage],
        }));
      },

      removeDynamicPage: (id) => {
        set((state) => ({
          dynamicPages: state.dynamicPages.filter((p) => p.id !== id),
        }));
      },

      toggleFooterChat: () => {
        set((state) => ({
          uiState: {
            ...state.uiState,
            footerChatOpen: !state.uiState.footerChatOpen,
          },
        }));
      },

      toggleSidebar: () => {
        set((state) => ({
          uiState: {
            ...state.uiState,
            sidebarCollapsed: !state.uiState.sidebarCollapsed,
          },
        }));
      },

      setUIState: (newState) => {
        set((state) => ({
          uiState: {
            ...state.uiState,
            ...newState,
          },
        }));
      },

      clearMessages: () => {
        set({ messages: [], currentPage: null });
      },

      loadChatHistory: () => {
        const state = get();
        if (state.messages && state.messages.length > 0) {
          const lastMessageWithSchema = [...state.messages]
            .reverse()
            .find((m) => m.componentSchema);
          
          if (lastMessageWithSchema && lastMessageWithSchema.componentSchema) {
            set({ currentPage: lastMessageWithSchema.componentSchema });
          }
        }
      },
    }),
    {
      name: 'mcp-app-storage',
      partialize: (state) => ({
        messages: state.messages,
        currentPage: state.currentPage,
        dynamicPages: state.dynamicPages,
        uiState: state.uiState,
      }),
    }
  )
);
