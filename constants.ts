import type { NavLink, SkillCategory, Project, Publication, Certification } from './types';
import { Cpu, BrainCircuit, Bot, Database, BarChart, Code, Monitor, GraduationCap, Award, BookOpen } from 'lucide-react';

export const NAV_LINKS: NavLink[] = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'publications', title: 'Publications' },
  { id: 'certifications', title: 'Certifications' },
  { id: 'contact', title: 'Contact' },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Machine Learning & AI',
    icon: BrainCircuit,
    skills: ['Model Development', 'LLM Fine-tuning', 'NLP', 'Neural Networks', 'Advanced ML Algorithms'],
  },
  {
    title: 'Data Science',
    icon: BarChart,
    skills: ['Python', 'Statistical Analysis', 'PowerBI', 'Tableau', 'RapidMiner'],
  },
  {
    title: 'Development',
    icon: Code,
    skills: ['C#', '.NET', 'JavaScript', 'React', 'Node.js', 'SQL'],
  },
];

export const PROJECTS_DATA: Project[] = [
    { title: 'AI-Powered Medical Diagnosis', description: 'Achieved 97% accuracy in diagnosing medical conditions using PyTorch, BERT, and Transformers.', tags: ['PyTorch', 'BERT', 'Transformers'], link: 'https://clara-ai.netlify.app/' },
    { title: 'YouSay-WeSay Election Platform', description: 'A globally recognized platform featured by LSE, built with React and Node.js.', tags: ['React', 'Node.js', 'JavaScript'], link: 'https://yousay-wesay.deakin.edu.au/' },
    { title: 'Multi-Modal AI Assistant', description: 'An intelligent assistant combining LLaMA, Whisper, and Stable Diffusion for comprehensive interaction.', tags: ['LLaMA', 'Whisper', 'Stable Diffusion'] },
    { title: 'Sports Analytics Dashboard', description: 'An interactive dashboard for sports analytics developed using R, Shiny, and statistical analysis.', tags: ['R', 'Shiny', 'Statistics'] },
    { title: 'Agent Management System', description: 'Advanced system leveraging BERT, PyAnnote, GPT, and Whisper for efficient agent management.', tags: ['BERT', 'GPT', 'Whisper'] },
    { title: 'LLM Fine-tuning Project', description: 'Specialized project on fine-tuning Large Language Models with PyTorch, Transformers, and PEFT.', tags: ['PyTorch', 'Transformers', 'PEFT'] },
    { title: 'Sentiment Analysis System', description: 'A robust system for analyzing sentiment using BERT, Python, and FastAPI.', tags: ['BERT', 'Python', 'FastAPI'] },
    { title: 'Healthcare Education Platform', description: 'A comprehensive educational platform for healthcare professionals, built on the MERN stack.', tags: ['React', 'Python', 'MongoDB'] },
];

export const PUBLICATIONS_DATA: Publication[] = [
    {
        title: "Research Proposal: Advancing Random Forests for High-Dimensional Imbalanced Data in Biomedical Applications",
        authors: ["Adhithyan Ajith"],
        journal: "Medium",
        year: 2023,
        abstract: "Explores challenges of high-dimensional, imbalanced data in biomedical research, proposing an enhanced Random Forest approach for improved performance and interpretability.",
        doi: "medium-2023-randomforests",
        link: "https://medium.com/@personal.adhithyan/research-proposal-advancing-random-forests-for-high-dimensional-imbalanced-data-in-biomedical-5a1cb92632aa"
    }
];


export const CERTIFICATIONS_DATA: Certification[] = [
  { title: 'Python for Data Science and AI', issuer: 'IBM', icon: Cpu },
  { title: 'Technical Support Fundamentals', issuer: 'Google', icon: Monitor },
  { title: 'Introduction to Artificial Intelligence', issuer: 'IBM', icon: BrainCircuit },
  { title: 'Machine Learning Certified Badge', issuer: 'IBM', icon: Award },
  { title: 'Generative AI and Prompt Engineering', issuer: 'Coursera', icon: Bot },
  { title: 'Cryptocurrencies, Forex & Options Trading', issuer: 'Udemy', icon: BarChart },
];
