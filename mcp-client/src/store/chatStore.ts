import { create } from "zustand";
import { AppStore, ChatMessage } from "../types";

export const useAppStore = create<AppStore>((set) => ({
  messages: [],
  currentPage: null,
  dynamicPages: [],
  mcpSession: null,
  uiState: {
    footerChatOpen: false,
    sidebarCollapsed: false,
    currentView: "canvas",
  },

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: Date.now().toString(), timestamp: new Date() },
      ],
    })),
  setCurrentPage: (schema) => set({ currentPage: schema }),
  addDynamicPage: (page) =>
    set((state) => ({
      dynamicPages: [
        ...state.dynamicPages,
        { ...page, id: Date.now().toString(), createdAt: new Date() },
      ],
    })),
  removeDynamicPage: (id) =>
    set((state) => ({
      dynamicPages: state.dynamicPages.filter((p) => p.id !== id),
    })),
  toggleFooterChat: () =>
    set((state) => ({
      uiState: {
        ...state.uiState,
        footerChatOpen: !state.uiState.footerChatOpen,
      },
    })),
  toggleSidebar: () =>
    set((state) => ({
      uiState: {
        ...state.uiState,
        sidebarCollapsed: !state.uiState.sidebarCollapsed,
      },
    })),
  setUIState: (uiState) =>
    set((state) => ({
      uiState: { ...state.uiState, ...uiState },
    })),
  clearMessages: () => set({ messages: [] }),
  loadChatHistory: () => {
    // In a real app, you'd fetch this from an API
    console.log("Loading chat history...");
    // For now, we'll just add a welcome message.
    const history: ChatMessage[] = [
      {
        id: "1",
        role: "assistant",
        content: "Welcome back!",
        timestamp: new Date(),
      },
    ];
    set({ messages: history });
  },
}));
