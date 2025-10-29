import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { useAppStore } from './store';

jest.mock('./store');

const mockUseAppStore = useAppStore as jest.Mock;

test('renders dashboard header', () => {
  mockUseAppStore.mockReturnValue({
    uiState: {
      sidebarCollapsed: false,
    },
    messages: [],
    toggleSidebar: jest.fn(),
    loadChatHistory: jest.fn(),
  });

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/Área de Trabalho/i);
  expect(headerElement).toBeInTheDocument();
});
