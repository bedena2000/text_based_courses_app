export type Step = {
  id: string;
  title: string;
  content: string; // текст объяснения
  codeSnippets?: string[]; // кодовые примеры
  order: number;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  stepsCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  author: string;
  tags: string[];
  steps: Step[]; // вот это добавляем
};
