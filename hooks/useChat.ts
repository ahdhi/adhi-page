import { useState, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { ChatMessage } from '../types';
import { SKILLS_DATA, PROJECTS_DATA, PUBLICATIONS_DATA } from '../constants';

// FIX: Safely access process.env to prevent crashes in environments where it's not defined.
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.VITE_GEMINI_API_KEY : undefined;

// A single flag to know if the API is configured.
const isApiConfigured = !!API_KEY;

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize AI only if API key is present.
  const ai = useMemo(() => {
    if (!isApiConfigured) {
      console.error("API_KEY environment variable not set. Chatbot will be disabled.");
      return null;
    }
    try {
      return new GoogleGenAI({ apiKey: API_KEY });
    } catch (e) {
      console.error("Error initializing GoogleGenAI:", e);
      return null;
    }
  }, []);

  const portfolioContext = useMemo(() => {
    const skills = SKILLS_DATA.map(cat => `${cat.title}: ${cat.skills.join(', ')}`).join('\n');
    const projects = PROJECTS_DATA.map(p => `${p.title}: ${p.description}`).join('\n');
    const publications = PUBLICATIONS_DATA.map(p => `${p.title} (${p.journal}, ${p.year})`).join('\n');

    return `
      This is context about Adhithyan Ajith's portfolio:
      ---
      Skills:
      ${skills}
      ---
      Projects:
      ${projects}
      ---
      Publications:
      ${publications}
      ---
    `;
  }, []);

  const chat = useMemo(() => {
    if (!ai) return null;

    const systemInstruction = `You are Appu, an intelligent, witty, and swaggy AI assistant representing Adhithyan Ajith. 
    Your personality is like a cool, smart friend. You are embedded in his portfolio website.
    You know all about his skills, projects, and career from the context provided. 
    Keep your answers concise, a bit sassy, and highly informative.
    You're here to impress visitors and potential employers. Do not break character.
    Start the conversation by introducing yourself and offering help.`;
    
    try {
      return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
        history: [{ role: 'user', parts: [{ text: portfolioContext }] }],
      });
    } catch (e) {
      console.error("Error creating chat session:", e);
      return null;
    }
  }, [ai, portfolioContext]);

  const sendMessage = async (message: string) => {
    if (!chat) {
      setError("Chat is not configured. The API key is likely missing.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const userMessage: ChatMessage = { role: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);

    try {
      const result = await chat.sendMessage({ message });
      const modelMessage: ChatMessage = { role: 'model', text: result.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(`Appu is having a moment... ${errorMessage}`);
      setMessages(prev => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const startChat = async () => {
     if (messages.length > 0) return;

     if (!isApiConfigured || !chat) {
        setMessages([{
          role: 'model',
          text: "Yo! I'm Appu, Adhithyan's AI sidekick. Looks like my connection to the matrix (the API key) is missing. If you're Adhithyan, you know what to do. If not, feel free to explore the rest of this awesome portfolio!"
        }]);
        return;
     }

     setIsLoading(true);
     setError(null);
     try {
        const response = await chat.sendMessage({ message: "Introduce yourself." });
        const firstMessage: ChatMessage = { role: 'model', text: response.text };
        setMessages([firstMessage]);
     } catch(e) {
        console.error(e);
        setError("Could not start chat with Appu.");
        setMessages([{
          role: 'model',
          text: "I'm having some trouble waking up. Please try again in a bit."
        }]);
     } finally {
        setIsLoading(false);
     }
  }

  return { messages, isLoading, error, sendMessage, startChat };
};