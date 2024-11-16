# **AI-Powered Content Summarizer**

This Chrome extension allows users to summarize web content into short, medium, or long summaries using the ApyHub API. It's easy to use and integrates seamlessly into your browser.

---

## **Features**

- Summarize web pages with just a few clicks.
- Options for short, medium, or long summaries.
- Clean and intuitive interface.
- Powered by ApyHub's AI capabilities.

---

## **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/ai-content-summarizer.git
   ```

2. **Open Chrome Extensions**:

   - Navigate to `chrome://extensions/` in your browser.

3. **Enable Developer Mode**:

   - Toggle the switch at the top right corner of the Extensions page.

4. **Load the extension**:

   - Click on **Load unpacked** and select the directory where you saved the extension files.

5. **Set up API key**:
   - Open the `background.js` file and replace `YOUR_APYHUB_API_KEY` with your ApyHub API key.

---

## **Usage**

1. **Navigate to a webpage** you want to summarize.
2. **Open the extension** by clicking its icon in the Chrome toolbar.
3. **Select summary type**:
   - **Short**, **Medium**, or **Long**.
4. The summary will appear in the popup after processing.

---

## **Code Structure**

### **1. `manifest.json`**

Defines the extension's metadata and permissions.

```json
{
  "manifest_version": 3,
  "name": "AI-Powered Content Summarizer",
  "version": "1.0",
  "description": "Summarize web content using ApyHub AI.",
  "permissions": ["activeTab", "scripting"],
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

---

### **2. `background.js`**

Handles communication with the ApyHub API and manages summarization.

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log("AI Summary Extension installed");
});

async function summarizeText(url, length) {
  const apiKey = "YOUR_APYHUB_API_KEY";
  const endpoint = "https://api.apyhub.com/ai/summarize-url";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "apy-token": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, summary_length: length }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    }

    const data = await response.json();
    return data.data.summary;
  } catch (error) {
    console.error("Error summarizing:", error);
    return "Error occurred. Please try again.";
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "summarizePage") {
    summarizeText(message.url, message.length).then((summary) =>
      sendResponse({ summary })
    );
    return true;
  }
});
```

---

### **3. `popup.js`**

Manages user interactions in the popup interface.

```javascript
["short", "medium", "long"].forEach((type) => {
  document
    .getElementById(type)
    .addEventListener("click", () => summarizePage(type));
});

function summarizePage(length) {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: () => document.body.innerText,
      },
      ([result]) => {
        const pageText = result.result;

        chrome.runtime.sendMessage(
          { action: "summarizePage", url: pageText, length },
          (response) => {
            document.getElementById("summary").innerText = response.summary;
          }
        );
      }
    );
  });
}
```

---

### **4. `popup.html`**

Defines the user interface of the extension.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>AI Summarizer</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 10px;
      }
      button {
        margin: 5px;
        padding: 10px;
      }
      #summary {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <h2>Summarize This Page</h2>
    <button id="short">Short</button>
    <button id="medium">Medium</button>
    <button id="long">Long</button>
    <div id="summary"></div>
    <script src="popup.js"></script>
  </body>
</html>
```

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### **Screenshots**

- **Popup Interface**  
  (Insert an image of the popup interface here for visual clarity.)

---

Feel free to customize this as needed. Let me know if you'd like me to add screenshots, troubleshooting tips, or more details!
