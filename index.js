async function summarizeText(text, length) {
  const apiKey =
    "APY0yuN0MOjr3GHY3aA8b9Hd2VXb2Y3IyxeqaxSaqV5sElMrQFo39CQUIapefkO5pY2sNaR"; // Replace with your ApyHub API key
  const url = "https://api.apyhub.com/ai/summarize-url"; // ApyHub endpoint

  const staticText =
    "This is a test text. It can be summarized into short, medium, or long formats.";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "apy-token": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: staticText, // Use static text instead of page URL
        summary_length: short, // Use the selected summary length
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    displaySummary(data.data.summary);
  } catch (error) {
    console.error("Error summarizing text:", error);
    displaySummary("Error summarizing text. Please try again.");
  }
}
