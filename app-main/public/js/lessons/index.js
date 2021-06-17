import { quill } from "../quill_init.js";
import lessonHelper from "./helper.js";
import { handleClear, handleViewClick } from "../events/eventHandlers.js";

// cache elements that are globally necessary
const lessonsContainer = document.querySelector(".lessons");
const createLessonContainer = document.querySelector(
  ".create-lesson-container"
);
const lessonInput = document.querySelector(".create-lesson-input");
const tagSelectors = document.querySelector(".tag-selectors");

// handle if no lessons in local storage
function handleNoLessons() {
  if (JSON.parse(localStorage.getItem("user")).lessons.length) {
    return;
  }

  const noLessons = document.createElement("p");
  noLessons.classList.add("no-lessons");

  noLessons.textContent = "No lessons :(";
  lessonsContainer.appendChild(noLessons);
}

// Count lessons
function handleLessonsCount() {
  const lessonCount = document.querySelector(".lessons-count");
  if (JSON.parse(localStorage.getItem("user")).lessons.length) {
    lessonCount.innerHTML = JSON.parse(
      localStorage.getItem("user")
    ).lessons.length;
  } else {
    lessonCount.innerHTML = "";
    return;
  }
}

// Display lesson in editor
function handleEditClick(lesson) {
  // cache clearBtn and submit button
  const clearBtn = document.querySelector(".create-lesson-clear");
  const submitLessonElement = document.querySelector("#submit");
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

// handle buttons in lesson
function lessonHandler(e) {
  const lessonCard = e.currentTarget;

  switch (e.target.id) {
    case "delete":
      removeLesson(lessonCard.getAttribute("data-id"));
      alert("Lesson Deleted Successfully!");
      return;
    case "view":
      handleViewClick(lessonCard);
      return;
    case "edit":
      handleEditClick(lessonCard);
      return;
  }
}

// render lessons from localStorage
export function renderLessons({ lessons }) {
  handleClear();

  if (lessonsContainer.childElementCount) {
    lessonsContainer.innerHTML = "";
  }
  lessons.forEach(({ title, content, id }) => {
    // create each element of card
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
      textContent: "VIEW",
      id: "view",
    });

    // append elements to card
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

  // Display no lessons if none and lesson count;
  handleNoLessons();
  handleLessonsCount();
}

// function to add lesson
export function addLesson() {
  try {
    // get user
    const user = JSON.parse(localStorage.getItem("user"));
    // get editor content;
    const content = quill.root.innerHTML;

    // Boolean for if edit View
    const isEditView = createLessonContainer
      .getAttribute("view")
      .includes("edit-lesson");

    // filter tags that are "selected" upon submission
    const tags = [...tagSelectors.children].filter((tag) =>
      tag.classList.contains("selected")
    );
    // Regex to match any number of whitespaces in the content form.
    var regex = /<(.|\n)*?>/g;
    if (content.replace(regex, "").trim().length === 0) {
      alert("Tried to add empty lesson note.");
      return;
    }
    if (isEditView) {
      const id = createLessonContainer.getAttribute("view").split(":")[1];

      user.lessons = user.lessons.map((lesson) => {
        if (lesson.id === id) {
          lesson.title = lessonInput.value;
          lesson.content = content;
          lesson.tags = tags;
        }
        return lesson;
      });

      if (!user.lessons.length) {
        alert("Tried to add empty lessons.");
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
        tags,
      });

      localStorage.setItem("user", JSON.stringify(user));

      lessonInput.value = "";
      renderLessons(user);
    }
    let submitLessonElement = document.getElementById("submit");
    if (submitLessonElement.innerText === "UPDATE LESSON") {
      submitLessonElement.innerText = "ADD LESSON";
    }
  } catch {
    alert("Failed to add lesson. Try again later!");
  }
}

// function to remove lesson
function removeLesson(deleteId) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    user.lessons = user.lessons.filter((lesson) => lesson.id !== deleteId);
    localStorage.setItem("user", JSON.stringify(user));
    renderLessons(user);

    // if the lesson is in edit mode and user remove lesson submit button text should become "ADD LESSON"
    // and the view attribute  should have value "create-lesson" insted of "edit-lesson" as we have removed the lesson.
    if (createLessonContainer.getAttribute("view").includes("edit-lesson")) {
      document.getElementById("submit").innerText = "ADD LESSON";

      createLessonContainer.setAttribute("view", "create-lesson");
    }
  } catch {
    alert("Failed to delete! Try again later");
  }
}
