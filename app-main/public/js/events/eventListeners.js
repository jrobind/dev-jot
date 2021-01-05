// import necessary modules from other js files
import {
  handleCloseLessonModal,
  handleClear,
  handleClearBtn,
  handleViewClick,
} from "./eventHandlers.js";
import { addLesson } from "../lessons/index.js";
import registerSW from "./serviceWorker.js";

// modular function to set events 
export default function setEventListeners() {

  // cache necessary elements
  const overlay = document.querySelector(".overlay");
  const modalLessonClose = document.querySelector(".modal-lesson-close");
  const formElement = document.querySelector("form");
  const clearBtn = document.querySelector(".create-lesson-clear");

  // event listener setup
  //  submit lesson  
  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    addLesson();
  });

  // Close Modal on button click
  modalLessonClose.addEventListener("click", handleCloseLessonModal);

  //  Clear form inputs
  clearBtn.addEventListener("click", handleClear);

  //  Close modal on container click
  overlay.addEventListener("click", handleCloseLessonModal);
  
  // clear lesson editor 
  formElement.addEventListener("keyup", handleClearBtn);
  
  // register Service Worker to handle caching for faster reloads
  window.addEventListener("load", () => {
    registerSW();
  });
}
