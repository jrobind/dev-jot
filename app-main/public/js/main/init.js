import { quill } from "./quill_init.js";
import setEventListeners from "./events/eventListeners.js";
import setUser from "./setUser.js";
import showContainers from "./showContainers.js";

export default function init() {
  quill.root.focus();
  // Clear all containers of "hidden" attributes
  showContainers();

  // Set up User in Local Storage
  setUser();

  // initialize the event listeners;
  setEventListeners();
}
