const reactFundamentalsCourse = {
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
      content: `
React is a JavaScript library for building user interfaces. 
It allows you to create reusable components and manage the state of your app efficiently.
`,
      codeSnippets: [
        `// Simple React component
function HelloWorld() {
  return <h1>Hello World</h1>;
}`,
      ],
      order: 1,
    },
    {
      id: "s2",
      title: "Components and Props",
      content: `
Components are the building blocks of a React application. 
Props are used to pass data from parent to child components.
`,
      codeSnippets: [
        `function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}`,
      ],
      order: 2,
    },
    {
      id: "s3",
      title: "State and Events",
      content: `
State allows components to be dynamic and interactive. 
You can update the state using the useState hook.
`,
      codeSnippets: [
        `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
      ],
      order: 3,
    },
    {
      id: "s4",
      title: "JSX and Rendering",
      content: `
JSX is a syntax extension that looks like HTML and allows you to write UI in JavaScript. 
React renders JSX into actual DOM elements.
`,
      codeSnippets: [
        `const element = <h1>Hello, React!</h1>;
ReactDOM.render(element, document.getElementById('root'));`,
      ],
      order: 4,
    },
  ],
};
