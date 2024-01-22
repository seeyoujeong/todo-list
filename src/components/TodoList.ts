import { Todo } from "../types";

interface TodoListProps {
  parentEl: HTMLElement;
  state: Todo[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

class TodoList {
  targetEl: HTMLElement;
  state: Todo[];
  deleteTodo: TodoListProps["deleteTodo"];
  toggleTodo: TodoListProps["toggleTodo"];
  constructor({ parentEl, state, deleteTodo, toggleTodo }: TodoListProps) {
    this.targetEl = document.createElement("div");
    this.targetEl.className = "todo-list-container";
    parentEl.append(this.targetEl);

    this.state = state;
    this.deleteTodo = deleteTodo;
    this.toggleTodo = toggleTodo;

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
                <input type="checkbox" ${todo.isCompleted && "checked"} />
                ${todo.isCompleted ? `<del>${todo.contents}</del>` : todo.contents}
                <button class="todo-list-item-button">삭제</button>
              </li>
            `
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
      ".todo-list-container"
    )!;

    containerEl.addEventListener("click", (event) => {
      if (event.target instanceof Element) {
        const liEl = event.target.closest<HTMLLIElement>(".todo-list-item");

        if (liEl && liEl.dataset.id) {
          if (event.target.className === "todo-list-item-button") {
            this.deleteTodo(liEl.dataset.id);
          } else {
            this.toggleTodo(liEl.dataset.id);
          }
        }
      }
    });
  }
}

export default TodoList;
