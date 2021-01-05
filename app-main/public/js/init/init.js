import { quill } from "../quill_init.js";
import setEventListeners from "../events/eventListeners.js";
import setUser from "./setUser.js";
import showContainers from "./showContainers.js";

export default function init() {
  // create a quill 
  quill.root.focus();
  
  // Clear all containers of "hidden" attributes
  showContainers();

  //Find User in Local Storage or set one up
  setUser();

  // initialize the event listeners from /EVENTS
  setEventListeners();
}
