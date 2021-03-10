import { quill } from "../quill_init.js";

// cached document elements
const overlay = document.querySelector(".overlay");
const modalLesson = document.querySelector(".modal-lesson");
const modalLessonTitle = document.querySelector(".modal-lesson-title");
const modalLessonContent = document.querySelector(".modal-lesson-content");
const lessonInput = document.querySelector(".create-lesson-input");
const submitLessonElement = document.querySelector("#submit");
const clearBtn = document.querySelector(".create-lesson-clear");
const tagSelectors = document.querySelector(".tag-selectors");

export function handleClear(e) {
  quill.root.innerHTML = "";
  lessonInput.value = "";
  clearBtn.setAttribute("hidden", "");

  const selectedTags = [...tagSelectors.children].filter((tag) =>
    tag.classList.contains("selected")
  );

  selectedTags.forEach((tag) => {
    tag.classList.remove("selected");
  });
}

export function handleViewClick(lesson) {
  const title = lesson.querySelector(".lesson-card-title").innerText;
  const content = lesson.querySelector(".lesson-card-content").innerHTML;

  modalLessonTitle.innerText = title;
  modalLessonContent.innerHTML = content;
  modalLesson.removeAttribute("hidden");
  overlay.removeAttribute("hidden");
  overlay.classList.add("dark");
}

export function handleClearBtn() {
  let textLessonContent = quill.root.innerHTML;
  let textTitleContent = document.querySelector(".create-lesson-input");
  if (
    textTitleContent.value.length > 0 ||
    (textLessonContent.length >= 8 && textLessonContent !== "<p><br></p>")
  ) {
    clearBtn.removeAttribute("hidden");
  } else {
    clearBtn.setAttribute("hidden", "");
  }
}

export function handleCloseLessonModal() {
  modalLessonTitle.innerHTML = "";
  modalLessonContent.innerHTML = "";

  modalLesson.setAttribute("hidden", "");
  overlay.setAttribute("hidden", "");
  overlay.classList.remove("dark");
}

export function handleEscapeLessonModal(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    handleCloseLessonModal();
  }
}

export function handleTagVisibility(e) {
  const tagSelectors = document.querySelector(".tag-selectors");
  tagSelectors.classList.toggle("hidden");
}

export function handleTagSelect(e) {
  const addTagButton = document.querySelector(".add-tag");
  let tag = e.target;
  tag.classList.toggle("selected");
}
