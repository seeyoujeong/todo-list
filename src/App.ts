import TodoList from "./components/TodoList.ts";

const data = [
  {
    contents: "todo1",
    isCompleted: false,
  },
  {
    contents: "todo2",
    isCompleted: false,
  },
  {
    contents: "todo3",
    isCompleted: false,
  },
];

interface AppProps {
  parentEl: HTMLElement;
}

class App {
  constructor({ parentEl }: AppProps) {
    new TodoList({ parentEl, state: data });
  }
}

export default App;
