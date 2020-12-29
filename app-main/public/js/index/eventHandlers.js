import { quill } from "../firebase/firebase_quill_init.js";

exports.handleClear= function(e) {
  quill.root.innerHTML = "";
  lessonInput.value = "";
  clearBtn.setAttribute("hidden", "");
  submitLessonElement.textContent = "ADD LESSON";
}

exports.handleViewClick = function(lesson) {
  const title = lesson.querySelector(".lesson-card-title").innerText;
  const content = lesson.querySelector(".lesson-card-content").innerHTML;

  modalLessonTitle.innerText = title;
  modalLessonContent.innerHTML = content;
  modalLesson.removeAttribute("hidden");
  overlay.removeAttribute("hidden");
  overlay.classList.add("dark");
}

exports.handleClearBtn = function() {
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

exports.handleCloseLessonModal = function() {
  modalLessonTitle.innerHTML = "";
  modalLessonContent.innerHTML = "";

  modalLesson.setAttribute("hidden", "");
  overlay.setAttribute("hidden", "");
  overlay.classList.remove("dark");
}

module.exports = exports;
