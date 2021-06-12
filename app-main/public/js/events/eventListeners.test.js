const eventHandlers = require("./eventHandlers.js");

describe("Checks that event listeners are called appropriately", () => {
  test("Test modal lesson close click event", () => {
    document.body.innerHTML = `
      <button class="modal-lesson-close button">
        <img alt="remove lesson icon" src="./images/cancel-white.svg" />
      </button>
    `;
    const modalLessonClose = document.querySelector(".modal-lesson-close");

    eventHandlers.handleCloseLessonModal = jest.fn(() => {});
    modalLessonClose.addEventListener(
      "click",
      eventHandlers.handleCloseLessonModal
    );

    modalLessonClose.click();
    expect(eventHandlers.handleCloseLessonModal).toBeCalled();
  });

  test("Test overlay lesson close click event", () => {
    document.body.innerHTML = `
      <div class="overlay"></div>
    `;
    const overlay = document.querySelector(".overlay");

    overlay.click();
    expect(eventHandlers.handleCloseLessonModal).toBeCalled();
  });

  test("Test lesson close escape keypress event", () => {
    eventHandlers.handleEscapeLessonModal = jest.fn(() => {});
    document.addEventListener("keydown", eventHandlers.handleEscapeLessonModal);

    const event = new KeyboardEvent("keydown", { keyCode: 27, which: 27 });
    document.dispatchEvent(event);

    expect(eventHandlers.handleEscapeLessonModal).toBeCalled();
  });

  test("Test clear button click event", () => {
    document.body.innerHTML = `
      <button class="create-lesson-clear button" hidden>Clear</button>
    `;
    const clearBtn = document.querySelector(".create-lesson-clear");
    eventHandlers.handleClear = jest.fn(() => {});
    clearBtn.addEventListener("click", eventHandlers.handleClear);

    clearBtn.click();
    expect(eventHandlers.handleClear).toBeCalled();
  });

  test("Test form clear button", () => {
    document.body.innerHTML = `
      <form>
        <div class="create-lesson-title-container">
          <input
            class="create-lesson-input"
            type="text"
            placeholder="Lesson title"
            required
          />
          <button
            class="add-tag create-lesson-input"
            id="addTag"
            type="button"
          >
            Tags
          </button>
          <!-- <select class="create-lesson-input" type="select">
            <option value="" selected disabled hidden>Tag</option>
          </select> -->
        </div>
        <div class="tag-selectors hidden"></div>
        <div id="editor"></div>
        <button class="button" id="submit" type="submit">
          ADD LESSON
        </button>
      </form>
    `;
    const formElement = document.querySelector("form");
    eventHandlers.handleClearBtn = jest.fn(() => {});
    formElement.addEventListener("keyup", eventHandlers.handleClearBtn);

    const event = new KeyboardEvent("keyup");
    formElement.dispatchEvent(event);

    expect(eventHandlers.handleClearBtn).toBeCalled();
  });

  test("Test addTagButton click event", () => {
    document.body.innerHTML = `
      <button
        class="add-tag create-lesson-input"
        id="addTag"
        type="button"
      >
        Tags
      </button>
    `;
    const addTagButton = document.querySelector(".add-tag");
    eventHandlers.handleTagVisibility = jest.fn(() => {});
    addTagButton.addEventListener("click", eventHandlers.handleTagVisibility);

    addTagButton.click();
    expect(eventHandlers.handleTagVisibility).toBeCalled();
  });

  test("Test tagSelectors click event", () => {
    document.body.innerHTML = `
      <div class="tag-selectors hidden"></div>
    `;
    const tagSelectors = document.querySelector(".tag-selectors");
    eventHandlers.handleTagSelect = jest.fn(() => {});
    tagSelectors.addEventListener("click", eventHandlers.handleTagSelect);

    tagSelectors.click();
    expect(eventHandlers.handleTagSelect).toBeCalled();
  });
});
