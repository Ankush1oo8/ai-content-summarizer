document.getElementById("short").addEventListener("click", () => summarizePage("short"));
document.getElementById("medium").addEventListener("click", () => summarizePage("medium"));
document.getElementById("long").addEventListener("click", () => summarizePage("long"));

function summarizePage(length) {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.runtime.sendMessage(
            { action: "summarizePage", url: tab.url, length },
            (response) => {
                document.getElementById("summary").innerText =
                    response?.summary || "Failed to summarize the page.";
            }
        );
    });
}

