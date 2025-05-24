chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "open-ai-platform") {
    chrome.storage.local.get(["platform", "prompt"], (result) => {
      const transcript = message.transcript;
      const selectedPlatform = result.platform || "chatgpt";
      const customPrompt =
        result.prompt || "Summarize this YouTube video: [transcript]";
      const finalPrompt = customPrompt.replace("[transcript]", transcript);

      const url = getPlatformUrl(selectedPlatform, finalPrompt);

      if (selectedPlatform === "chatgpt") {
        copyToClipboard(finalPrompt);
        chrome.tabs.create({ url });
      } else {
        chrome.tabs.create({ url });
      }
    });
  }
});

function getPlatformUrl(platform, prompt) {
  const encodedPrompt = encodeURIComponent(prompt);
  switch (platform) {
    case "chatgpt":
      return "https://chat.openai.com";
    case "gemini":
      return `https://gemini.google.com/app?query=${encodedPrompt}`;
    case "claude":
      return `https://claude.ai/chats/new?query=${encodedPrompt}`;
    default:
      return "https://chat.openai.com";
  }
}

function copyToClipboard(text) {
  const input = document.createElement("textarea");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}
