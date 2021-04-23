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
