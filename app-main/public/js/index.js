// import quill init
import { quill } from "./firebase/firebase_quill_init.js";
import {
  handleCloseLessonModal,
  handleClear,
  handleClearBtn,
  handleViewClick,
} from "./index/eventHandlers.js";
import lessonHelper from "./index/lessons/helper.js";
import { addLesson } from "./index/lessons/index.js";
import init from "./index/init.js";

// cached DOM elements
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

// initialize Application
init();

// Register Service Worker
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered");
    } catch (e) {
      alert("Service Worker registration failed.");
    }
  } else {
    alert("Your browser does not support service workers.");
  }
}

window.addEventListener("load", () => {
  registerSW();
});
