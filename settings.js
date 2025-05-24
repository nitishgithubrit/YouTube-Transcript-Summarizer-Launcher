document.addEventListener("DOMContentLoaded", () => {
  const platformInput = document.getElementById("platform");
  const promptInput = document.getElementById("prompt");
  const status = document.getElementById("status");

  // Load saved values
  chrome.storage.local.get(["platform", "prompt"], (data) => {
    if (data.platform) platformInput.value = data.platform;
    if (data.prompt) promptInput.value = data.prompt;
  });

  // Save settings
  document.getElementById("save").addEventListener("click", () => {
    const platform = platformInput.value;
    const prompt = promptInput.value;

    chrome.storage.local.set({ platform, prompt }, () => {
      status.textContent = "Settings saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });
});
