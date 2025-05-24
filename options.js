document.addEventListener("DOMContentLoaded", () => {
  const defaultPrompt = "Summarize this YouTube video: [transcript]";

  // Load saved settings
  chrome.storage.local.get(["platform", "prompt"], (data) => {
    document.getElementById("platform").value = data.platform || "chatgpt";
    document.getElementById("prompt").value = data.prompt || defaultPrompt;
  });

  // Save updated settings
  document.getElementById("update").addEventListener("click", () => {
    const platform = document.getElementById("platform").value;
    const prompt = document.getElementById("prompt").value;

    chrome.storage.local.set({ platform, prompt }, () => {
      alert("Settings updated successfully!");
    });
  });
});
