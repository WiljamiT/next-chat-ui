import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatBot from '@/components/Chat/ChatBot';

beforeEach(() => {
  const mockLocalStorage = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });

  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe('ChatBot Component', () => {
  it('renders the chat assistant and input field', () => {
    render(<ChatBot />);

    expect(screen.getByText(/ai avustaja/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/type your message.../i);
    expect(input).toBeInTheDocument();

    const sendButton = screen.getByRole('button', { name: /lähetä/i });
    expect(sendButton).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<ChatBot />);

    const input = screen.getByPlaceholderText(/type your message.../i);

    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input).toHaveValue('Hello');
  });

  it('adds user message when submitting', async () => {
    render(<ChatBot />);
    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /lähetä/i });

    fireEvent.change(input, { target: { value: 'Hello bot' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('Hello bot')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    render(<ChatBot />);
    const input = screen.getByPlaceholderText(/type your message/i);

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: /lähetä/i }));

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });

  it('shows loading state while waiting for response', async () => {
    global.fetch = jest.fn(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<ChatBot />);
    const input = screen.getByPlaceholderText(/type your message/i);

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: /lähetä/i }));

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('clears chat history when clear button is clicked', () => {
    window.confirm = jest.fn(() => true);

    render(<ChatBot />);
    const clearButton = screen.getByRole('button', { name: /tyhjennä/i });

    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button', { name: /lähetä/i }));

    fireEvent.click(clearButton);

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('submits message on Ctrl+Enter', () => {
    render(<ChatBot />);
    const input = screen.getByPlaceholderText(/type your message/i);

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('loads messages from localStorage on mount', () => {
    const mockMessages = [
      {
        id: '1',
        role: 'user',
        content: 'Hello',
        timestamp: new Date().toISOString(),
      },
    ];

    localStorage.setItem('chatMessages', JSON.stringify(mockMessages));

    render(<ChatBot />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not submit empty messages', () => {
    render(<ChatBot />);
    const sendButton = screen.getByRole('button', { name: /lähetä/i });

    fireEvent.click(sendButton);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('displays correctly formatted timestamps', () => {
    const now = new Date();
    const mockMessages = [
      {
        id: '1',
        role: 'user',
        content: 'Hello',
        timestamp: now,
      },
    ];

    localStorage.setItem('chatMessages', JSON.stringify(mockMessages));

    render(<ChatBot />);

    const expectedTime = now.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });

    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });
});
