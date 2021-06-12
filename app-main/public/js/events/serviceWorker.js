export default async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("../../sw.js");
      console.log("Service Worker registered");
    } catch (e) {
      alert("Service Worker registration failed.");
    }
  } else {
    alert("Your browser does not support service workers.");
  }
}
