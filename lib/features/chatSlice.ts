import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  diagnosis?: {
    possibleConditions: string[];
    recommendedMedicines: string[];
    thingsToAvoid: string[];
    severity: 'low' | 'medium' | 'high';
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastUpdated: Date;
}

interface ChatState {
  currentSession: ChatSession | null;
  chatHistory: ChatSession[];
  isLoading: boolean;
}

const initialState: ChatState = {
  currentSession: null,
  chatHistory: [
    {
      id: '1',
      title: 'Headache and Fever Consultation',
      createdAt: new Date('2024-01-15'),
      lastUpdated: new Date('2024-01-15'),
      messages: [
        {
          id: '1',
          type: 'user',
          content: 'I have been experiencing severe headaches and fever for the past 2 days. The headache is throbbing and gets worse with light.',
          timestamp: new Date('2024-01-15T10:00:00Z'),
        },
        {
          id: '2',
          type: 'ai',
          content: 'Based on your symptoms of severe headaches, fever, and light sensitivity (photophobia), here is my analysis:',
          timestamp: new Date('2024-01-15T10:01:00Z'),
          diagnosis: {
            possibleConditions: ['Migraine with fever', 'Viral infection', 'Tension headache with flu'],
            recommendedMedicines: ['Ibuprofen 400mg', 'Paracetamol 500mg', 'Plenty of fluids'],
            thingsToAvoid: ['Bright lights', 'Loud noises', 'Caffeine', 'Screen time'],
            severity: 'medium',
          },
        },
      ],
    },
    {
      id: '2',
      title: 'Stomach Pain Query',
      createdAt: new Date('2024-01-10'),
      lastUpdated: new Date('2024-01-10'),
      messages: [
        {
          id: '3',
          type: 'user',
          content: 'I have stomach pain after eating spicy food. It feels like burning sensation.',
          timestamp: new Date('2024-01-10T15:30:00Z'),
        },
        {
          id: '4',
          type: 'ai',
          content: 'Your symptoms suggest acid reflux or gastritis. Here are my recommendations:',
          timestamp: new Date('2024-01-10T15:31:00Z'),
          diagnosis: {
            possibleConditions: ['Acid reflux', 'Gastritis', 'Peptic ulcer'],
            recommendedMedicines: ['Antacid tablets', 'Omeprazole 20mg', 'Simethicone'],
            thingsToAvoid: ['Spicy food', 'Citrus fruits', 'Coffee', 'Alcohol'],
            severity: 'low',
          },
        },
      ],
    },
  ],
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startNewSession: (state) => {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: 'New Consultation',
        messages: [],
        createdAt: new Date(),
        lastUpdated: new Date(),
      };
      state.currentSession = newSession;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      if (state.currentSession) {
        state.currentSession.messages.push(action.payload);
        state.currentSession.lastUpdated = new Date();
        
        // Update title based on first user message
        if (action.payload.type === 'user' && state.currentSession.messages.length === 1) {
          const words = action.payload.content.split(' ').slice(0, 5);
          state.currentSession.title = words.join(' ') + (action.payload.content.split(' ').length > 5 ? '...' : '');
        }
      }
    },
    saveSession: (state) => {
      if (state.currentSession && state.currentSession.messages.length > 0) {
        const existingIndex = state.chatHistory.findIndex(session => session.id === state.currentSession?.id);
        if (existingIndex >= 0) {
          state.chatHistory[existingIndex] = state.currentSession;
        } else {
          state.chatHistory.unshift(state.currentSession);
        }
      }
    },
    loadSession: (state, action: PayloadAction<string>) => {
      const session = state.chatHistory.find(session => session.id === action.payload);
      if (session) {
        state.currentSession = { ...session };
      }
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      state.chatHistory = state.chatHistory.filter(session => session.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  startNewSession,
  addMessage,
  saveSession,
  loadSession,
  deleteSession,
  setLoading,
} = chatSlice.actions;
export default chatSlice.reducer;