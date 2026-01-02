import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../types";

interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Learn the basics of React, components, props, and state.",
    stepsCount: 4,
    level: "Beginner",
    author: "John Doe",
    tags: ["React", "Frontend", "JavaScript"],
    steps: [
      {
        id: "s1",
        title: "Introduction to React",
        content: "React is a JavaScript library for building user interfaces.",
        codeSnippets: [`function HelloWorld() { return <h1>Hello World</h1>; }`],
        order: 1,
      },
      {
        id: "s2",
        title: "Components and Props",
        content: "Components are the building blocks of a React app.",
        codeSnippets: [`function Greeting({ name }) { return <p>Hello, {name}!</p>; }`],
        order: 2,
      },
      {
        id: "s3",
        title: "State and Events",
        content: "State allows components to be dynamic.",
        codeSnippets: [
          `import { useState } from 'react';
function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>Increment</button>; }`,
        ],
        order: 3,
      },
      {
        id: "s4",
        title: "JSX and Rendering",
        content: "JSX is HTML-like syntax for rendering UI.",
        codeSnippets: [`const element = <h1>Hello, React!</h1>; ReactDOM.render(element, document.getElementById('root'));`],
        order: 4,
      },
    ],
  },
  {
    id: "2",
    title: "TypeScript for JavaScript Developers",
    description: "Learn strong typing, interfaces, generics, and advanced TS patterns.",
    stepsCount: 3,
    level: "Intermediate",
    author: "Jane Smith",
    tags: ["TypeScript", "JavaScript"],
    steps: [
      {
        id: "s1",
        title: "Type Basics",
        content: "Learn types, interfaces, and type inference.",
        codeSnippets: [`let age: number = 25;`],
        order: 1,
      },
      {
        id: "s2",
        title: "Generics",
        content: "Generics allow reusable components with type safety.",
        codeSnippets: [`function identity<T>(arg: T): T { return arg; }`],
        order: 2,
      },
      {
        id: "s3",
        title: "Advanced Patterns",
        content: "Learn mapped types, utility types, and conditional types.",
        codeSnippets: [`type ReadOnly<T> = { readonly [P in keyof T]: T[P] };`],
        order: 3,
      },
    ],
  },
];

const initialState: CoursesState = {
  courses: mockCourses,
  selectedCourse: null,
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
    },
    setSelectedCourse(state, action: PayloadAction<string>) {
      state.selectedCourse =
        state.courses.find((course) => course.id === action.payload) || null;
    },
    addCourse(state, action: PayloadAction<Course>) {
      state.courses.push(action.payload);
    },
    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) state.courses[index] = action.payload;
    },
    deleteCourse(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});

export const {
  setCourses,
  setSelectedCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
