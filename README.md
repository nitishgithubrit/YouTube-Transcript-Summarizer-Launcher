# 🎬 Transcript Summarizer Chrome Extension

A lightweight and efficient Chrome extension to **summarize YouTube video transcripts** using AI platforms like **ChatGPT**, **Google Gemini**, or **Claude**. Perfect for students, researchers, or anyone who wants to quickly digest long video content.

---

## 🚀 Features

- 📄 Automatically fetches the transcript from YouTube videos.
- 🧠 Supports summarization using:
  - ChatGPT
  - Google Gemini
  - Claude (Anthropic)
- 📝 Copies transcript + custom prompt to clipboard.
- 🔗 Opens selected AI platform in a new tab for summarization.

---

## 🛠️ Installation

1. **Download or Clone this Repository**
   ```bash
   git clone https://github.com/nitishgithubrit/transcript-summarizer.git

2. Open Chrome Extensions Page
   Go to chrome://extensions/
   Enable Developer Mode (toggle in the top right)
3. Load Unpacked Extension
   Click “Load unpacked”
   Select the folder where you saved the extension files
4. You should now see the Transcript Summarizer icon in your browser toolbar.

📖 How to Use
1. Visit a YouTube video with a transcript available.

2. Click the extension icon, then click “Open Settings”.

3. In settings, choose your preferred AI platform (ChatGPT, Gemini, Claude) and customize the prompt (e.g., "Summarize the video in simple words: [transcript]").

4. A “Summarize” button will appear on the YouTube video page.

5. Click it! The extension will:
    Automatically fetch the transcript.
    Copy a prompt (with the transcript) to your clipboard.
    Open the selected AI platform in a new tab.
6. Just paste the prompt there — and get your summary instantly!

⚙️ Settings Page
    Set your preferred AI platform:
    ChatGPT (default)
    Gemini
    Claude

Set your custom prompt, e.g.:
text
Copy
Edit
Summarize this YouTube video in bullet points: [transcript]
Use [transcript] as a placeholder — it will be replaced with the actual text.

📁 Project Structure
css
Copy
Edit
transcript-summarizer/
├── manifest.json
├── popup.html
├── popup.js
├── settings.html
├── settings.js
├── contentScript.js
├── background.js
└── icon.png

🧑‍💻 Tech Stack
HTML + CSS + JavaScript
Chrome Extensions APIs
YouTube DOM Manipulation
Clipboard API

✅ Example Prompt
css
Copy
Edit
Give me a summary of the following video content: [transcript]
You can change this to anything you like, including language translation prompts, question extraction, etc.

🔒 Permissions Used
storage - Save user settings
tabs and scripting - Inject summarize button and control tab behavior
activeTab - Access the current YouTube tab

🙋‍♂️ Author
Nitish Kumar
🎓 B.Tech CSE Student | 💻 Frontend Developer
🔗 LinkedIn
💻 GitHub

