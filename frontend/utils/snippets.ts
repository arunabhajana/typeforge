export const codeSnippets = [
    {
        language: "typescript",
        code: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`
    },
    {
        language: "javascript",
        code: `const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};`
    },
    {
        language: "typescript",
        code: `interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}

const getUser = (id: number): User => {
  return {
    id,
    username: "guest",
    email: "guest@example.com",
    isActive: true
  };
}`
    },
    {
        language: "javascript",
        code: `Array.prototype.myMap = function(callback) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
};`
    }
];

export const getRandomSnippet = () => {
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
};
