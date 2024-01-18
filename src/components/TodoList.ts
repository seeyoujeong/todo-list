import { Todo } from "../types";

interface TodoListProps {
  parentEl: HTMLElement;
  state: Todo[];
}

class TodoList {
  targetEl: HTMLElement;
  state: Todo[];
  constructor({ parentEl, state }: TodoListProps) {
    this.targetEl = document.createElement("div");
    this.targetEl.className = "todo-list-container";
    parentEl.append(this.targetEl);

    this.state = state;

    this.render();
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
}

export default TodoList;
