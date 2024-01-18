interface AppProps {
  parentEl: HTMLElement;
}

class App {
  constructor({ parentEl }: AppProps) {
    parentEl.innerHTML = "app";
  }
}

export default App;
