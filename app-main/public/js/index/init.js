import {quill} from "../firebase/firebase_quill_init.js";
import avatars from "./avatars.js";
import {renderLessons} from "./lessons/index.js";

const preAuthContainer = document.querySelector(".pre-auth-container");
const profileElement = document.querySelector(".profile");
const avatarElement = document.querySelector(".avatar img");
const appContainer = document.querySelector(".app-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function init() {
  quill.root.focus();
  appContainer.removeAttribute("hidden");
  profileElement.removeAttribute("hidden");
  modal.setAttribute("hidden", "");
  preAuthContainer.setAttribute("hidden", "");
  overlay.setAttribute("hidden", "");

  if (!localStorage.getItem("user")) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        avatar: `/images/avatars/${
          avatars[Math.floor(Math.random() * avatars.length)]
        }.svg`,
        lessons: [],
      })
    );
  } else {
    renderLessons(JSON.parse(localStorage.getItem("user")));
  }
  avatarElement.setAttribute(
    "src",
    JSON.parse(localStorage.getItem("user")).avatar
  );
}

export default init;