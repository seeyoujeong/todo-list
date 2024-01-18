import "./style.css";
import App from "./App.ts";

const app = document.querySelector<HTMLElement>("#app")!;

new App({ parentEl: app });
