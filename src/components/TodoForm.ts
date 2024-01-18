interface TodoFormProps {
  parentEl: HTMLElement;
  addTodo: (contents: string) => void;
}

class TodoForm {
  targetEl: HTMLElement;
  addTodo: TodoFormProps["addTodo"];
  constructor({ parentEl, addTodo }: TodoFormProps) {
    this.targetEl = document.createElement("div");
    this.targetEl.className = "todo-form-container";
    parentEl.append(this.targetEl);

    this.addTodo = addTodo;

    this.render();

    this.setEvent();
  }

  render() {
    this.targetEl.innerHTML = `
      <form class="todo-form">
        <input type="text" class="todo-form-input"/>
        <button class="todo-form-button">추가</button>
      </form>
    `;
  }

  setEvent() {
    const formEl = document.querySelector<HTMLFormElement>(".todo-form")!;
    const inputEl =
      document.querySelector<HTMLInputElement>(".todo-form-input")!;

    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addTodo(inputEl.value);
      inputEl.value = "";
    });
  }
}

export default TodoForm;
