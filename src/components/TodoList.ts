interface TodoListProps {
  parentEl: HTMLElement;
  state: Todo[];
}

interface Todo {
  contents: string;
  isCompleted: boolean;
}

class TodoList {
  targetEl: HTMLElement;
  state: Todo[];
  constructor({ parentEl, state }: TodoListProps) {
    this.targetEl = document.createElement("div");
    this.targetEl.className = "todo-list";
    parentEl.append(this.targetEl);

    this.state = state;

    this.render();
  }

  render() {
    this.targetEl.innerHTML = `
      <ul>
        ${this.state
          .map(
            (todo, index) => `
          <li data-id="${index}">
            ${todo.contents}
          </li>
        `,
          )
          .join("")}
      </ul>
    `;
  }
}

export default TodoList;
