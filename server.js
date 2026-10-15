const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate-design", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: "AI is not configured yet. Add your OPENAI_API_KEY as a server secret, then restart the app."
      });
    }

    const { prompt, style, text, size } = req.body || {};
    if (!prompt || typeof prompt !== "string" || prompt.length > 1500) {
      return res.status(400).json({ error: "Please enter a design description under 1500 characters." });
    }

    const fullPrompt = [
      "Create a polished, print-design concept for a professional Indian banner and graphics printing shop.",
      "Design type/style: " + (style || "Modern"),
      "Required text to include if possible: " + (text || "No exact text supplied"),
      "Customer brief: " + prompt,
      "Make the composition clear, high contrast, visually attractive, and suitable as a design concept for a flex banner or poster.",
      "Avoid watermarks, fake logos, mockup scenes, and extra unrelated text. Preserve supplied wording as accurately as possible."
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: fullPrompt,
        size: ["1024x1024", "1536x1024", "1024x1536"].includes(size) ? size : "1536x1024"
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "The AI image service could not generate the design."
      });
    }

    const image = data?.data?.[0]?.b64_json;
    if (!image) {
      return res.status(502).json({ error: "No image was returned. Please try again." });
    }
    res.json({ image: "data:image/png;base64," + image });
  } catch (error) {
    console.error("Design generation error:", error);
    res.status(500).json({ error: "Something went wrong while generating the design." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Bala Graphics app running on port ${PORT}`));
