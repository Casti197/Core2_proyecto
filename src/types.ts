export interface InteractiveChallenge {
  prompt: string;
  type: 'open' | 'fill-gap' | 'order-principles' | 'multi-choice';
  sentenceTemplate?: string;
  gapOptions?: string[];
  gapAnswer?: string;
  items?: string[];
  correctOrder?: string[];
  options?: string[];
  correctOptionIndex?: number;
}

export interface Pillar {
  id: string;
  name: string;
  icon: string; // Lucide icon name string for mapping
  color: string;
  levels: number;
  description: string;
  challenges: (string | InteractiveChallenge)[];
}

export interface Comment {
  id: string;
  userName: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category?: string;
  image?: string;
  comments?: Comment[];
}

export interface Message {
  role: 'user' | 'ai';
  content: string;
}
