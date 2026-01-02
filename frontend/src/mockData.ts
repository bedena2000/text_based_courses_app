import type { Course } from "./types";

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Learn the basics of React, components, props, and state.",
    stepsCount: 24,
    level: "Beginner",
    author: "John Doe",
    tags: ["React", "Frontend", "JavaScript"],
    steps: [],
  },
  {
    id: "2",
    title: "TypeScript for JavaScript Developers",
    description:
      "Strong typing, interfaces, generics, and real-world patterns.",
    stepsCount: 18,
    level: "Intermediate",
    author: "Jane Smith",
    tags: ["TypeScript", "JavaScript"],
    steps: [],
  },
  {
    id: "3",
    title: "Modern CSS with Tailwind",
    description: "Build responsive and clean UIs using Tailwind CSS.",
    stepsCount: 15,
    level: "Beginner",
    author: "Alex Johnson",
    tags: ["CSS", "Tailwind", "UI"],
    steps: [],
  },
  {
    id: "4",
    title: "Advanced React Patterns",
    description: "Context API, custom hooks, render props, HOCs.",
    stepsCount: 20,
    level: "Advanced",
    author: "Emily Davis",
    tags: ["React", "Hooks", "Frontend"],
    steps: [],
  },
  // сюда добавь остальные mock-курсы так же
];
