chrome.runtime.onInstalled.addListener(() => {
    console.log("AI-Powered Content Summarizer installed");
});

const API_KEY = "APY0zVEeg0cPAr8Xwxfq7K1yvZAnFo7r2EGP8N8McdRO8KaxlrzV0llwFmf61UiT"; // Replace this with your actual ApyHub API key

async function summarizeText(url, length) {
    const apiUrl = "https://api.apyhub.com/ai/summarize-url";
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "apy-token": API_KEY, // Using the hardcoded API key
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                summary_length: length // "short", "medium", or "long"
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return data.data.summary;
    } catch (error) {
        console.error("Error summarizing text:", error.message);
        return "Error summarizing text. Please try again later.";
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "summarizePage") {
        summarizeText(message.url, message.length).then((summary) => {
            sendResponse({ summary });
        });
        return true; // Keeps the message channel open
    }
});

