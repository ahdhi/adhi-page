// Fix: Import `ElementType` from `react` to resolve TypeScript error.
import type { ElementType } from 'react';

export interface NavLink {
  id: string;
  title: string;
}

export interface SkillCategory {
  title: string;
  // Fix: Replace `React.ElementType` with the imported `ElementType`.
  icon: ElementType;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Publication {
  title:string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  doi: string;
  link: string;
}

export interface Certification {
  title: string;
  issuer: string;
  // Fix: Replace `React.ElementType` with the imported `ElementType`.
  icon: ElementType;
}

export interface VisitorData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  timezone: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}