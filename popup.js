// document.getElementById("openSettings").addEventListener("click", () => {
//   chrome.tabs.create({ url: chrome.runtime.getURL("settings.html") });
// });

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("openSettings");

  if (btn) {
    btn.addEventListener("click", () => {
      chrome.runtime.getURL("settings.html"); // Just get the URL first
      chrome.tabs.create({ url: chrome.runtime.getURL("settings.html") });
    });
  }
});
