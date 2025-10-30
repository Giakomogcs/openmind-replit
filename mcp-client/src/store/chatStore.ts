import { create } from "zustand";
import { AppStore, ChatMessage, Project } from "../types";
import api from "../services/api";

export const useAppStore = create<AppStore>((set, get) => ({
  messages: [],
  currentPage: null,
  dynamicPages: [],
  mcpSession: null,
  uiState: {
    footerChatOpen: false,
    sidebarCollapsed: false,
    currentView: "canvas",
  },
  projects: [],
  activeProjectId: null,

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
    const activeProjectId = get().activeProjectId;
    if (!activeProjectId) return;
    // In a real app, you'd fetch this from an API
    console.log(`Loading chat history for project ${activeProjectId}...`);
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
  loadProjects: async () => {
    try {
      const projects = await api.get('/projects');
      set({ projects: projects.data });
    } catch (error) {
      console.error('Failed to load projects', error);
    }
  },
  createProject: async (name: string) => {
    try {
      const newProject = await api.post('/projects', { name });
      set((state) => ({
        projects: [...state.projects, newProject.data],
      }));
      return newProject.data;
    } catch (error) {
      console.error('Failed to create project', error);
      throw error;
    }
  },
  setActiveProject: (projectId: number | null) => {
    localStorage.setItem('activeProjectId', projectId ? projectId.toString() : '');
    set({ activeProjectId: projectId });
    if (projectId) {
      get().loadChatHistory();
    } else {
      set({ messages: [] });
    }
  },
}));
