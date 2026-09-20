import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'admin';
  text: string;
  timestamp: number;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  toggleChat: () => void;
  sendMessage: (text: string, sender: 'customer' | 'admin') => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          id: 'msg-init',
          sender: 'admin',
          text: 'Hello! I am the Master Tailor. How can I help you with your custom garment today?',
          timestamp: Date.now() - 10000
        }
      ],
      isOpen: false,
      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
      sendMessage: (text, sender) => set((state) => ({
        messages: [...state.messages, { id: `msg-${Date.now()}`, sender, text, timestamp: Date.now() }]
      })),
      clearChat: () => set({ messages: [] })
    }),
    {
      name: 'endew-chat-storage',
    }
  )
);
