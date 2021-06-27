import setTags from "./setTags.js";

test("Tests creating elements to hold tags", () => {
  document.body.innerHTML = `
    <div class="tag-selectors hidden"></div>
  `;

  // Tags hardcoded in setTags.js
  const tags = [
    "programming",
    "in-progress",
    "frameworks",
    "data-structures",
    "algorithms",
  ];

  setTags();
  const tagSelectors = Array.from(
    document.querySelector(".tag-selectors").children
  );

  expect(tagSelectors.length).toBe(5);

  tagSelectors.forEach((element) => {
    // Expects tagCheckboxes className to be added to each element
    expect(element.className).toEqual(expect.stringContaining("tagCheckboxes"));

    // Expects elements value to be one from array
    expect(tags).toEqual(expect.arrayContaining([element.value]));

    // Expects elements class to be one from array
    expect([...tags, "tagCheckboxes"]).toEqual(
      expect.arrayContaining(Array.from(element.classList))
    );
  });
});
