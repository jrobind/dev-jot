export default function setTags() {
  const tags = [
    "programming",
    "in-progress",
    "frameworks",
    "data-structures",
    "algorithms",
  ];

  const tagSelectors = document.querySelector(".tag-selectors");

  tags.forEach((tag) => {
    let option = document.createElement("div");
    option.value = tag;
    option.className = "tagCheckboxes";
    option.classList.add(tag);
    tagSelectors.appendChild(option);
  });
}
