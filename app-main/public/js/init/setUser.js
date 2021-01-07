import avatars from "./avatars.js";
import { renderLessons } from "../lessons/index.js";

export default function setUser() {
  const avatarElement = document.querySelector(".avatar img");
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
