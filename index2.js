require("dotenv").config();
const API_KEY = " process.env.API_KEY";
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
async function handle(e) {
  e.preventDefault();

  const input = document.getElementById("input").value;

  const data = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: input,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    let ans = result.candidates[0].content.parts[0].text;

    // Replace **...** with <strong>...</strong> for bold styling
    ans = ans.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<h1>${input}</h1><br/><h2>${ans}</h2>`;
    document.getElementById("input").value = "";
  } catch (error) {
    console.error("Error:", error);
  }
}
