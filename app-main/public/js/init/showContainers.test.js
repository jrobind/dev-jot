import showContainers from "./showContainers.js";

test("Tests adjusting/removing classes from container elements", () => {
  document.body.innerHTML = `
    <div class="pre-auth-container"></div>
    <div hidden class="profile"></div>
    <div hidden class="app-container"></div>
    <div class="modal"></div>
    <div class="overlay"></div>
  `;

  const preAuthContainer = document.querySelector(".pre-auth-container");
  const profile = document.querySelector(".profile");
  const appContainer = document.querySelector(".app-container");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  showContainers();

  expect(preAuthContainer.attributes.hidden.value).toBe("");
  expect(profile.attributes.hidden).toBe(undefined);
  expect(appContainer.attributes.hidden).toBe(undefined);
  expect(modal.attributes.hidden.value).toBe("");
  expect(overlay.attributes.hidden.value).toBe("");
});
