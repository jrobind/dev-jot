import setUser from "./setUser.js";

test("Tests setting user data when local storage is empty", () => {
  document.body.innerHTML = `
    <div class="avatar">
      <img referrerpolicy="no-referrer" alt="avatar" />
    </div>
  `;

  const avatarElement = document.querySelector(".avatar img");

  setUser();

  expect(avatarElement.attributes.src).not.toBe(undefined);
});
