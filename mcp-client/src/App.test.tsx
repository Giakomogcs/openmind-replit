import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { useAppStore } from './store';

jest.mock('./store');

const mockUseAppStore = useAppStore as unknown as jest.Mock;

test('renders dashboard header', () => {
  mockUseAppStore.mockReturnValue({
    uiState: {
      sidebarCollapsed: false,
    },
    messages: [],
    projects: [],
    activeProject: null,
    activeProjectId: null,
    setActiveProject: jest.fn(),
    loadProjects: jest.fn(),
    createProject: jest.fn(),
    toggleSidebar: jest.fn(),
    loadChatHistory: jest.fn(),
  });

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/Project Hub/i);
  expect(headerElement).toBeInTheDocument();
});
