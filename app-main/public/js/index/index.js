// import quill init
import { quill } from "../firebase/firebase_quill_init.js";
import avatars from './avatars.js';
import modal from './modals.js';


// cached DOM elements
const preAuthContainer = document.querySelector(".pre-auth-container");
const profileElement = document.querySelector(".profile");
const avatarElement = document.querySelector(".avatar img");
const appContainer = document.querySelector(".app-container");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalLesson = document.querySelector(".modal-lesson");
const modalLessonClose = document.querySelector(".modal-lesson-close");
const modalLessonTitle = document.querySelector(".modal-lesson-title");
const modalLessonContent = document.querySelector(".modal-lesson-content");
const createLessonContainer = document.querySelector(".create-lesson-container");
const lessonInput = document.querySelector(".create-lesson-input");
const formElement = document.querySelector("form");
const submitLessonElement = document.querySelector("#submit");
const lessonsContainer = document.querySelector(".lessons");
const lessonCount = document.querySelector(".lessons-count");
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


function lessonHelper({
  varName,
  eventListener,
  classList,
  attribute,
  textContent,
  innerHTML,
  id,
}) {
  if (eventListener) {
    varName.addEventListener(
      Object.keys(eventListener)[0],
      Object.values(eventListener)[0]
    );
  }
  if (classList) {
    for (let i = 0; i < classList.length; i++) {
      varName.classList.add(classList[i]);
    }
  }
  if (attribute) {
    for (let i = 0; i < attribute.length; i++) {
      varName.setAttribute(
        Object.keys(attribute[i])[0],
        Object.values(attribute[i])[0]
      );
    }
  }
  if (textContent) {
    varName.textContent = textContent;
  }
  if (innerHTML) {
    varName.innerHTML = innerHTML;
  }
  if (id) {
    varName.id = id;
  }
  return varName;
}

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

function handleNoLessons() {
  if (JSON.parse(localStorage.getItem("user")).lessons.length) {
    return;
  }

  const noLessons = document.createElement("p");
  noLessons.classList.add("no-lessons");

  noLessons.textContent = "No lessons :(";
  lessonsContainer.appendChild(noLessons);
}

function handleLessonsCount() {
	if (JSON.parse(localStorage.getItem("user")).lessons.length) {
		lessonCount.innerHTML = JSON.parse(localStorage.getItem("user")).lessons.length;
	} else {
		lessonCount.innerHTML = '';
		return;
	}
}

function handleEditClick(lesson) {
  // get lesson title and content
  const title = lesson.querySelector(".lesson-card-title").innerText;
  const content = lesson.querySelector(".lesson-card-content").innerHTML;
  const delta = quill.clipboard.convert(content);

  // switch view state
  createLessonContainer.setAttribute(
    "view",
    `edit-lesson:${lesson.getAttribute("data-id")}`
  );
  clearBtn.removeAttribute("hidden");

  quill.setContents(delta, "silent");
  lessonInput.value = title;
  submitLessonElement.textContent = "UPDATE LESSON";
}

function lessonHandler(e) {
  const lessonCard = e.currentTarget;

  switch (e.target.id) {
    case "delete":
      removeLesson(lessonCard.getAttribute("data-id"));
      return;
    case "view":
      handleViewClick(lessonCard);
      return;
    case "edit":
      handleEditClick(lessonCard);
      return;
  }
}

function renderLessons({ lessons }) {
	handleClear();

	if (lessonsContainer.childElementCount) {
		lessonsContainer.innerHTML = "";
	}
	lessons.forEach(({ title, content, id }) => {
		const lessonCard = lessonHelper({
			varName: document.createElement("div"),
			eventListener: { click: lessonHandler },
			classList: ["lesson-card"],
			attribute: [{ "data-id": id }],
		});
		const buttonContainer = lessonHelper({
			varName: document.createElement("div"),
			classList: ["lesson-card-content-buttons"],
		});

		const titleContainer = lessonHelper({
			varName: document.createElement("div"),
			classList: ["lesson-card-title-container"],
		});

		const lessonTitle = lessonHelper({
			varName: document.createElement("h2"),
			classList: ["lesson-card-title"],
			textContent: title,
		});

		const lessonContent = lessonHelper({
			varName: document.createElement("div"),
			classList: ["lesson-card-content", "ql-editor", "ql-container"],
			innerHTML: content,
		});

		const lessonRemoveBtn = lessonHelper({
			varName: document.createElement("div"),
			classList: ["button"],
			id: "delete",
		});

		const removeIcon = lessonHelper({
			varName: document.createElement("img"),
			attribute: [
				{ alt: "remove lesson icon" },
				{ src: "./images/cancel-white.svg" },
			],
			id: "delete",
		});

		const editIcon = lessonHelper({
			varName: document.createElement("img"),
			attribute: [
				{ alt: "edit lesson icon" },
				{ src: "./images/edit-white.svg" },
			],
			id: "edit",
		});

		const lessonEditBtn = lessonHelper({
			varName: document.createElement("button"),
			classList: ["button"],
			id: "edit",
		});

		const lessonViewBtn = lessonHelper({
			varName: document.createElement("button"),
			classList: ["button"],
			textContent: "VIEW LESSON",
			id: "view",
		});

		titleContainer.appendChild(lessonTitle);
		lessonRemoveBtn.appendChild(removeIcon);
		titleContainer.appendChild(lessonRemoveBtn);
		lessonCard.appendChild(titleContainer);
		lessonCard.appendChild(lessonContent);
		buttonContainer.appendChild(lessonViewBtn);
		lessonEditBtn.appendChild(editIcon);
		buttonContainer.appendChild(lessonEditBtn);
		lessonCard.appendChild(buttonContainer);
		lessonsContainer.appendChild(lessonCard);
	});

	handleNoLessons();
	handleLessonsCount();
}

function addLesson() {
  const user = JSON.parse(localStorage.getItem("user"));
  const content = quill.root.innerHTML;
  const isEditView = createLessonContainer
    .getAttribute("view")
    .includes("edit-lesson");
  // Regex to match any number of whitespaces in the content form.
  var regex = /<(.|\n)*?>/g;
  if (content.replace(regex, "").trim().length === 0) {
    console.log("Tried to add empty lesson note.");
    return;
  }
  if (isEditView) {
    const id = createLessonContainer.getAttribute("view").split(":")[1];

    user.lessons = user.lessons.map((lesson) => {
      if (lesson.id === id) {
        lesson.title = lessonInput.value;
        lesson.content = content;
      }
      return lesson;
    });

    if (!user.lessons.length) {
      console.log("Tried to add empty lessons.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    renderLessons(user);
    createLessonContainer.setAttribute("view", "create-lesson");
  } else {
    user.lessons.push({
      id: String(Math.floor(Math.random() * 90000 + 10000)),
      title: lessonInput.value,
      content,
    });

    localStorage.setItem("user", JSON.stringify(user));

    lessonInput.value = "";
    renderLessons(user);
  }
}

function removeLesson(deleteId) {
  const user = JSON.parse(localStorage.getItem("user"));

  user.lessons = user.lessons.filter((lesson) => lesson.id !== deleteId);
  localStorage.setItem("user", JSON.stringify(user));
  renderLessons(user);
}

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
