import { Todo } from "../types";

interface TodoListProps {
  parentEl: HTMLElement;
  state: Todo[];
  deleteTodo: (id: string) => void;
}

class TodoList {
  targetEl: HTMLElement;
  state: Todo[];
  deleteTodo: TodoListProps["deleteTodo"];
  constructor({ parentEl, state, deleteTodo }: TodoListProps) {
    this.targetEl = document.createElement("div");
    this.targetEl.className = "todo-list-container";
    parentEl.append(this.targetEl);

    this.state = state;
    this.deleteTodo = deleteTodo;

    this.render();

    this.setEvent();
  }

  render() {
    this.targetEl.innerHTML = `
      <ul class="todo-list">
        ${this.state
          .map(
            (todo, index) =>
              `
              <li data-id="${index}" class="todo-list-item">
                ${todo.contents}
              </li>
            `,
          )
          .join("")}
      </ul>
    `;
  }

  setState(nextState: Todo[]) {
    this.state = nextState;
    this.render();
  }

  setEvent() {
    const containerEl = document.querySelector<HTMLDivElement>(
      ".todo-list-container",
    )!;

    containerEl.addEventListener("click", (event) => {
      if (event.target instanceof Element) {
        const liEl = event.target.closest<HTMLLIElement>(".todo-list-item");

        if (liEl) {
          this.deleteTodo(liEl.dataset.id!);
        }
      }
    });
  }
}

export default TodoList;
