const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";
const HF_API_KEY = "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";  // replace with your actual key

// Call Hugging Face API for a single review
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

  // Map HuggingFace labels to actual sentiments
  const mapping = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
  };

  const best = result[0].reduce((prev, curr) => prev.score > curr.score ? prev : curr);
  return mapping[best.label];
}

// Main function
async function analyzeReviews() {
  // Read JSON file
  const fileData = fs.readFileSync("reviews.json", "utf-8");
  const input = JSON.parse(fileData);
  const reviews = input.reviews;

  let counts = { Positive: 0, Neutral: 0, Negative: 0 };

  for (const review of reviews) {
    const sentiment = await getSentiment(review);
    if (sentiment) counts[sentiment]++;
  }

  const total = reviews.length || 1;
  console.log("📊 Sentiment Distribution:");
  console.log({
    Positive: ((counts.Positive / total) * 100).toFixed(2) + "%",
    Neutral: ((counts.Neutral / total) * 100).toFixed(2) + "%",
    Negative: ((counts.Negative / total) * 100).toFixed(2) + "%"
  });
}

analyzeReviews();
