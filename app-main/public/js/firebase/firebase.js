// import { firebaseConfig, quill } from "./firebase_quill_init.js";

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const provider = new firebase.auth.GoogleAuthProvider();
// const db = firebase.firestore();

// // cached DOM elements
// const signInElement = document.querySelector(".sign-in");
// const signOutElement = document.querySelector(".sign-out");
// const preAuthContainer = document.querySelector(".pre-auth-container");
// const profileElement = document.querySelector(".profile");
// const avatarElement = document.querySelector(".avatar img");
// const appContainer = document.querySelector(".app-container");
// const overlay = document.querySelector(".overlay");
// const modal = document.querySelector(".modal");
// const modalLesson = document.querySelector(".modal-lesson");
// const modalLessonClose = document.querySelector(".modal-lesson-close");
// const modalLessonTitle = document.querySelector(".modal-lesson-title");
// const modalLessonContent = document.querySelector(".modal-lesson-content");
// const createLessonContainer = document.querySelector(
//   ".create-lesson-container"
// );
// const lessonInput = document.querySelector(".create-lesson-input");
// const formElement = document.querySelector("form");
// const submitLessonElement = document.querySelector("#submit");
// const lessonsContainer = document.querySelector(".lessons");
// const clearBtn = document.querySelector(".create-lesson-clear");

// let isAuthReady = false;

// signInElement.removeAttribute("hidden");
// signOutElement.removeAttribute("hidden");

// // event listener setup
// formElement.addEventListener("submit", function (e) {
//   e.preventDefault();
//   addLesson();
// });
// modalLessonClose.addEventListener("click", handleCloseLessonModal);
// clearBtn.addEventListener("click", handleClear);
// overlay.addEventListener("click", handleCloseLessonModal);

// if (!isAuthReady) {
//   appContainer.setAttribute("hidden", "");
//   profileElement.setAttribute("hidden", "");
//   preAuthContainer.removeAttribute("hidden");
//   overlay.setAttribute("hidden", "");
//   modal.setAttribute("hidden", "");
// }

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     if (!isAuthReady) {
//       isAuthReady = true;
//       init(user);
//     }
//   } else {
//     appContainer.setAttribute("hidden", "");
//     profileElement.setAttribute("hidden", "");
//     preAuthContainer.removeAttribute("hidden");
//     overlay.removeAttribute("hidden");
//     modal.removeAttribute("hidden");
//   }
// });

// function handleClear(e) {
//   quill.root.innerHTML = "";
//   lessonInput.value = "";
//   clearBtn.setAttribute("hidden", "");
//   submitLessonElement.textContent = "ADD LESSON";
// }

// function handleCloseLessonModal() {
//   modalLessonTitle.innerHTML = "";
//   modalLessonContent.innerHTML = "";

//   modalLesson.setAttribute("hidden", "");
//   overlay.setAttribute("hidden", "");
//   overlay.classList.remove("dark");
// }

// async function init(user) {
//   try {
//     quill.root.focus();
//     await renderLessons();
//     appContainer.removeAttribute("hidden");
//     profileElement.removeAttribute("hidden");
//     modal.setAttribute("hidden", "");
//     preAuthContainer.setAttribute("hidden", "");
//     overlay.setAttribute("hidden", "");
//     avatarElement.setAttribute("src", user.photoURL);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function handleEditClick(lesson) {
//   // get lesson title and content
//   const title = lesson.querySelector(".lesson-card-title").innerText;
//   const content = lesson.querySelector(".lesson-card-content").innerHTML;
//   const delta = quill.clipboard.convert(content);

//   // switch view state
//   createLessonContainer.setAttribute(
//     "view",
//     `edit-lesson:${lesson.getAttribute("data-id")}`
//   );
//   clearBtn.removeAttribute("hidden");

//   quill.setContents(delta, "silent");
//   lessonInput.value = title;
//   submitLessonElement.textContent = "UPDATE LESSON";
// }

// function lessonHandler(e) {
//   const lessonCard = e.currentTarget;

//   switch (e.target.id) {
//     case "delete":
//       removeLesson(lessonCard.getAttribute("data-id"));
//       return;
//     case "view":
//       handleViewClick(lessonCard);
//       return;
//     case "edit":
//       handleEditClick(lessonCard);
//       return;
//   }
// }

// function lessonHelper({
//   varName,
//   eventListener,
//   classList,
//   attribute,
//   textContent,
//   innerHTML,
//   id,
// }) {
//   if (eventListener) {
//     varName.addEventListener(
//       Object.keys(eventListener)[0],
//       Object.values(eventListener)[0]
//     );
//   }
//   if (classList) {
//     for (let i = 0; i < classList.length; i++) {
//       varName.classList.add(classList[i]);
//     }
//   }
//   if (attribute) {
//     for (let i = 0; i < attribute.length; i++) {
//       varName.setAttribute(
//         Object.keys(attribute[i])[0],
//         Object.values(attribute[i])[0]
//       );
//     }
//   }
//   if (textContent) {
//     varName.textContent = textContent;
//   }
//   if (innerHTML) {
//     varName.innerHTML = innerHTML;
//   }
//   if (id) {
//     varName.id = id;
//   }
//   return varName;
// }

// function handleViewClick(lesson) {
//   const title = lesson.querySelector(".lesson-card-title").innerText;
//   const content = lesson.querySelector(".lesson-card-content").innerHTML;

//   modalLessonTitle.innerText = title;
//   modalLessonContent.innerHTML = content;
//   modalLesson.removeAttribute("hidden");
//   overlay.removeAttribute("hidden");
//   overlay.classList.add("dark");
// }

// async function renderLessons() {
//   handleClear();
//   // render lesson cards
//   const snapshot = await db
//     .collection("users")
//     .doc(firebase.auth().currentUser.uid)
//     .get();
//   if (lessonsContainer.childElementCount) {
//     lessonsContainer.innerHTML = "";
//   }

//   if (snapshot.data() && snapshot.data().lessons.length) {
//     snapshot.data().lessons.forEach(({ title, content, id }) => {
//       const lessonCard = lessonHelper({
//         varName: document.createElement("div"),
//         eventListener: { click: lessonHandler },
//         classList: ["lesson-card"],
//         attribute: [{ "data-id": id }],
//       });
//       const buttonContainer = lessonHelper({
//         varName: document.createElement("div"),
//         classList: ["lesson-card-content-buttons"],
//       });

//       const titleContainer = lessonHelper({
//         varName: document.createElement("div"),
//         classList: ["lesson-card-title-container"],
//       });

//       const lessonTitle = lessonHelper({
//         varName: document.createElement("h2"),
//         classList: ["lesson-card-title"],
//         textContent: title,
//       });

//       const lessonContent = lessonHelper({
//         varName: document.createElement("div"),
//         classList: ["lesson-card-content", "ql-editor", "ql-container"],
//         innerHTML: content,
//       });

//       const lessonRemoveBtn = lessonHelper({
//         varName: document.createElement("div"),
//         classList: ["button"],
//         id: "delete",
//       });

//       const removeIcon = lessonHelper({
//         varName: document.createElement("img"),
//         attribute: [
//           { alt: "remove lesson icon" },
//           { src: "./images/cancel-white.svg" },
//         ],
//         id: "delete",
//       });

//       const editIcon = lessonHelper({
//         varName: document.createElement("img"),
//         attribute: [
//           { alt: "edit lesson icon" },
//           { src: "./images/edit-white.svg" },
//         ],
//         id: "edit",
//       });

//       const lessonEditBtn = lessonHelper({
//         varName: document.createElement("button"),
//         classList: ["button"],
//         id: "edit",
//       });

//       const lessonViewBtn = lessonHelper({
//         varName: document.createElement("button"),
//         classList: ["button"],
//         textContent: "VIEW LESSON",
//         id: "view",
//       });

//       titleContainer.appendChild(lessonTitle);
//       lessonRemoveBtn.appendChild(removeIcon);
//       titleContainer.appendChild(lessonRemoveBtn);
//       lessonCard.appendChild(titleContainer);
//       lessonCard.appendChild(lessonContent);
//       buttonContainer.appendChild(lessonViewBtn);
//       lessonEditBtn.appendChild(editIcon);
//       buttonContainer.appendChild(lessonEditBtn);
//       lessonCard.appendChild(buttonContainer);
//       lessonsContainer.appendChild(lessonCard);
//     });
//   } else {
//     const noLessons = document.createElement("p");
//     noLessons.classList.add("no-lessons");

//     noLessons.textContent = "No lessons :(";
//     lessonsContainer.appendChild(noLessons);
//   }
// }

// async function addUser(user) {
//   const { uid } = user;
//   const snapshot = await db.collection("users").where("uid", "==", uid).get();
//   const userExists = !snapshot.empty;

//   if (userExists) {
//     console.log("user already exists");
//   } else {
//     console.log("user does not exist. Adding...");
//     db.collection("users")
//       .doc(uid)
//       .set({ uid: uid, lessons: [] })
//       .catch((error) => {
//         console.error("Error adding document: ", error);
//       });
//   }
// }

// async function addLesson() {
//   const content = quill.root.innerHTML;
//   const isEditView = createLessonContainer
//     .getAttribute("view")
//     .includes("edit-lesson");
//   // Regex to match any number of whitespaces in the content form.
//   var regex = /<(.|\n)*?>/g;
//   if (content.replace(regex, "").trim().length === 0) {
//     console.log("Tried to add empty lesson note.");
//     return;
//   }
//   if (isEditView) {
//     try {
//       const id = createLessonContainer.getAttribute("view").split(":")[1];

//       const snapshot = await db
//         .collection("users")
//         .doc(firebase.auth().currentUser.uid)
//         .get();

//       const newLessons = snapshot.data().lessons.map((lesson) => {
//         if (lesson.id === id) {
//           lesson.title = lessonInput.value;
//           lesson.content = content;
//         }
//         return lesson;
//       });

//       if (!newLessons.length) {
//         console.log("Tried to add empty lessons.");
//         return;
//       }

//       await snapshot.ref.update({ lessons: newLessons });
//       renderLessons();
//       createLessonContainer.setAttribute("view", "create-lesson");
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     try {
//       await db
//         .collection("users")
//         .doc(firebase.auth().currentUser.uid)
//         .update({
//           lessons: firebase.firestore.FieldValue.arrayUnion({
//             title: lessonInput.value,
//             content,
//             id: String(Math.floor(Math.random() * 90000 + 10000)),
//           }),
//         });

//       lessonInput.value = "";
//       renderLessons();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// async function removeLesson(deleteId) {
//   try {
//     const snapshot = await db
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid)
//       .get();

//     const newLessons = snapshot
//       .data()
//       .lessons.filter((lesson) => lesson.id !== deleteId);

//     await snapshot.ref.update({ lessons: newLessons });
//     renderLessons();
//   } catch (error) {
//     console.log(error);
//   }
// }

// signInElement.addEventListener("click", async () => {
//   try {
//     const { user } = await firebase.auth().signInWithPopup(provider);

//     init(user);
//     addUser(user);
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     console.error(`${errorCode} ${errorMessage}`);
//   }
// });

// signOutElement.addEventListener("click", async () => {
//   try {
//     await firebase.auth().signOut();
//     console.log("signed out success");
//     appContainer.setAttribute("hidden", "");
//     profileElement.setAttribute("hidden", "");
//     preAuthContainer.removeAttribute("hidden");
//     overlay.removeAttribute("hidden");
//     modal.removeAttribute("hidden");

//     handleCloseLessonModal();
//   } catch (error) {
//     console.log(error);
//   }
// });
