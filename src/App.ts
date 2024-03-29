import TodoList from "./components/TodoList.ts";
import { Todo } from "./types.ts";
import TodoForm from "./components/TodoForm.ts";

interface AppProps {
  parentEl: HTMLElement;
}

class App {
  targetEl: HTMLElement;
  state: Todo[];
  todoList: TodoList;
  constructor({ parentEl }: AppProps) {
    this.targetEl = document.createElement("div");
    this.targetEl.className = "container";
    parentEl.append(this.targetEl);
    this.state = JSON.parse(localStorage.getItem("todo-list")!) || [];

    new TodoForm({
      parentEl: this.targetEl,
      addTodo: (contents: string) => {
        const todo: Todo = { contents, isCompleted: false };
        const todos = [...this.state, todo];

        this.setState(todos);
      },
    });
    this.todoList = new TodoList({
      parentEl: this.targetEl,
      state: this.state,
      deleteTodo: (id: string) => {
        const filteredTodos = this.state.filter(
          (_, index) => String(index) !== id
        );

        this.setState(filteredTodos);
      },
      toggleTodo: (id: string) => {
        const toggledTodos = this.state.map((todo, index) =>
          String(index) === id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        );

        this.setState(toggledTodos);
      },
    });
  }

  setState(nextState: Todo[]) {
    this.state = nextState;
    this.todoList.setState(this.state);
    localStorage.setItem("todo-list", JSON.stringify(this.state));
  }
}

export default App;
