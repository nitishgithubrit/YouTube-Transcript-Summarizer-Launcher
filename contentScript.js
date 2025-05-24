function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsed = 0;

    const check = () => {
      const element = document.querySelector(selector);
      if (element) resolve(element);
      else if (elapsed >= timeout)
        reject(new Error("Element not found: " + selector));
      else {
        elapsed += interval;
        setTimeout(check, interval);
      }
    };

    check();
  });
}

async function getTranscriptText() {
  const transcriptText = [];

  const segments = document.querySelectorAll("ytd-transcript-segment-renderer");
  if (segments.length > 0) {
    segments.forEach((segment) => transcriptText.push(segment.innerText));
    return transcriptText.join(" ");
  }

  const moreOptionsBtn = document.querySelector('[aria-label="More actions"]');
  if (moreOptionsBtn) {
    moreOptionsBtn.click();

    try {
      await waitForElement("ytd-menu-service-item-renderer");
    } catch (error) {
      alert("Transcript menu item not found.");
      return "Transcript not available.";
    }

    const items = document.querySelectorAll("ytd-menu-service-item-renderer");
    for (let item of items) {
      if (item.innerText.includes("Show transcript")) {
        item.click();
        break;
      }
    }

    try {
      await waitForElement("ytd-transcript-segment-renderer");
    } catch (error) {
      alert("Transcript segments not found after opening transcript.");
      return "Transcript not available.";
    }

    const newSegments = document.querySelectorAll(
      "ytd-transcript-segment-renderer"
    );
    if (newSegments.length > 0) {
      newSegments.forEach((segment) => transcriptText.push(segment.innerText));
      return transcriptText.join(" ");
    }
  }

  alert("Transcript not found or not available for this video.");
  return "Transcript not available.";
}

function createSummarizeButton() {
  if (document.getElementById("summarizeBtn")) return;

  const summarizeButton = document.createElement("button");
  summarizeButton.id = "summarizeBtn";
  summarizeButton.innerText = "Summarize";
  summarizeButton.style.position = "fixed";
  summarizeButton.style.top = "100px";
  summarizeButton.style.right = "20px";
  summarizeButton.style.zIndex = 9999;
  summarizeButton.style.padding = "10px 16px";
  summarizeButton.style.background = "#ff0000";
  summarizeButton.style.color = "#fff";
  summarizeButton.style.border = "none";
  summarizeButton.style.borderRadius = "5px";
  summarizeButton.style.cursor = "pointer";
  summarizeButton.style.fontWeight = "bold";
  summarizeButton.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.3)";

  summarizeButton.onclick = async () => {
    summarizeButton.disabled = true;
    summarizeButton.innerText = "Summarizing...";

    const transcript = await getTranscriptText();

    chrome.storage.local.get(["platform", "prompt"], (data) => {
      const platform = data.platform || "chatgpt";
      const promptTemplate =
        data.prompt || "Summarize this YouTube video: [transcript]";
      const finalPrompt = promptTemplate.replace("[transcript]", transcript);

      let url;
      if (platform === "chatgpt") {
        url = "https://chat.openai.com/";
      } else if (platform === "gemini") {
        url = "https://gemini.google.com/?q=" + encodeURIComponent(finalPrompt);
      } else if (platform === "claude") {
        url = "https://claude.ai/?q=" + encodeURIComponent(finalPrompt);
      }

      if (url) {
        window.open(url, "_blank");
        navigator.clipboard
          .writeText(finalPrompt)
          .then(() => {
            alert(
              "Transcript copied! Go to the AI platform and paste it if needed."
            );
          })
          .catch((err) => {
            alert("Unable to copy to clipboard. Please paste manually.");
            console.error(err);
          });
      }

      summarizeButton.disabled = false;
      summarizeButton.innerText = "Summarize";
    });
  };

  document.body.appendChild(summarizeButton);
}

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  setTimeout(createSummarizeButton, 1500);
} else {
  document.addEventListener("DOMContentLoaded", () =>
    setTimeout(createSummarizeButton, 1500)
  );
}
