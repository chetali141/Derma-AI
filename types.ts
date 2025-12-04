export interface RoutineStep {
  stepName: string;
  productCategory: string;
  keyIngredients: string[];
  reason: string;
}

export interface RoutineData {
  skinType: string;
  summary: string;
  morning: RoutineStep[];
  evening: RoutineStep[];
  weekly: RoutineStep[];
}

export interface QuizState {
  feel: string;
  concern: string;
  sensitivity: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export enum AppView {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
}
