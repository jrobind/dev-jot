import Quill from "./quillMock.js";
document.body.innerHtml = `
  <div id="editor"></div>
`;
global.Quill = Quill;
