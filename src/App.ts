import TodoList from "./components/TodoList.ts";
import { Todo } from "./types.ts";
import TodoForm from "./components/TodoForm.ts";

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
  state: Todo[];
  todoList: TodoList;
  constructor({ parentEl }: AppProps) {
    this.state = data;

    new TodoForm({
      parentEl,
      addTodo: (contents: string) => {
        const todo: Todo = { contents, isCompleted: false };
        const todos = [...this.state, todo];

        this.setState(todos);
      },
    });
    this.todoList = new TodoList({
      parentEl,
      state: this.state,
      deleteTodo: (id: string) => {
        console.log(id);
        const filteredTodos = this.state.filter(
          (_, index) => String(index) !== id,
        );

        this.setState(filteredTodos);
      },
    });
  }

  setState(nextState: Todo[]) {
    this.state = nextState;
    this.todoList.setState(this.state);
  }
}

export default App;
