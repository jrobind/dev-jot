// modular function to help create a lesson
export default function lessonHelper({
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
