import {
  handleCloseLessonModal,
  handleClear,
  handleClearBtn,
  handleViewClick,
} from "./eventHandlers.js";
import { addLesson } from "../lessons/index.js";
import registerSW from "../serviceWorker.js";

export default function setEventListeners() {
  const overlay = document.querySelector(".overlay");
  const modalLessonClose = document.querySelector(".modal-lesson-close");
  const formElement = document.querySelector("form");
  const clearBtn = document.querySelector(".create-lesson-clear");

  // event listener setup
  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    addLesson();
  });
  modalLessonClose.addEventListener("click", handleCloseLessonModal);
  clearBtn.addEventListener("click", handleClear);
  overlay.addEventListener("click", handleCloseLessonModal);
  formElement.addEventListener("keyup", handleClearBtn);
  window.addEventListener("load", () => {
    registerSW();
  });
}
