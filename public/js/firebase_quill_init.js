export const firebaseConfig = {
  apiKey: "AIzaSyBrrTgsW0PTZ2nPTs7mXcQrEyIbx9iSwqI",
  authDomain: "dev-jot-9d423.firebaseapp.com",
  databaseURL: "https://dev-jot-9d423.firebaseio.com",
  projectId: "dev-jot-9d423",
  storageBucket: "dev-jot-9d423.appspot.com",
  messagingSenderId: "849978326803",
  appId: "1:849978326803:web:8eeda6772f7fe24e14a4e6",
  measurementId: "G-4B69RWW1GP",
};

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["code-block", "image", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ size: ["small", false, "large", "huge"] }],
];

export const quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions,
  },
  placeholder: "Add some lesson notes!",
  theme: "snow",
});
