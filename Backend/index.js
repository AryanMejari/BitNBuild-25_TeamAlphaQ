const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const fs = require("fs");
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.HF_API_KEY)


const API_URL = process.env.H_API;
const HF_API_KEY = process.env.HF_API_KEY;
const apiKey = "AIzaSyAMOmj0pqdIdXVa_2eIJYvPkf4wsNCBn84";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const app = express();
app.use(cors());
app.use(express.json());


async function getSentiment(text) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: text })
  });

  if (!response.ok) {
    console.error("API error:", response.status, await response.text());
    return null;
  }

  const result = await response.json();
  if (!result || !Array.isArray(result) || result.length === 0) return null;

  const mapping = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
  };

  const best = result[0].reduce((prev, curr) =>
    prev.score > curr.score ? prev : curr
  );

  return mapping[best.label];
}

async function analyzeReviews(reviews) {
  let counts = { Positive: 0, Neutral: 0, Negative: 0 };

  for (const review of reviews) {
    const sentiment = await getSentiment(review);
    if (sentiment) counts[sentiment]++;
  }

  const total = reviews.length || 1;

  return {
  Positive: parseFloat(((counts.Positive / total) * 100).toFixed(2)),
  Neutral: parseFloat(((counts.Neutral / total) * 100).toFixed(2)),
  Negative: parseFloat(((counts.Negative / total) * 100).toFixed(2))
};

}


async function analyzeReviewsGemini(reviews) {
  const prompt = `You are an AI review analyzer. Given these customer reviews:

${reviews.join("\n\n")}

Perform the following tasks:
1. Keyword & Topic Extraction: List top 5 positive keywords and top 5 negative keywords.
2. Simple Summary: 3-4 lines summarizing the overall feedback.
3. Format the output as JSON with fields:
{
  "positive_keywords": [...],
  "negative_keywords": [...],
  "summary": "..."
}`;

  const body = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      console.error("Gemini HTTP error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    console.log("Full response:", JSON.stringify(data?.candidates?.[0]?.content?.parts?.[0] , null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    console.log("Extracted text:", text);

    // Fixed JSON extraction
    const cleanText = text.replace(/``````/g, '').trim();
    const startIndex = cleanText.indexOf('{');
    const endIndex = cleanText.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1) {
      const jsonString = cleanText.substring(startIndex, endIndex + 1);
      return JSON.parse(jsonString);
    }

    return null;

  } catch (err) {
    console.error("Gemini error:", err);
    return null;
  }
}

app.post("/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    
    const reviews = await page.$$eval(".review-text-content span", nodes =>
      nodes.map(n => n.innerText.trim())
    );
    
    await browser.close();

    const review=await analyzeReviews(reviews);
    console.log(review)
    const gem=await analyzeReviewsGemini(reviews);
    res.json({ review,gem,reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scrape page" });
  }
});


app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
