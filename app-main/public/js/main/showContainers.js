export default function showContainers() {
  document.querySelector(".pre-auth-container").setAttribute("hidden", "");
  document.querySelector(".profile").removeAttribute("hidden");
  document.querySelector(".app-container").removeAttribute("hidden");
  document.querySelector(".modal").setAttribute("hidden", "");
  document.querySelector(".overlay").setAttribute("hidden", "");
}
