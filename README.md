# Review Analyzer & Sentiment Dashboard

A web application that fetches product reviews from popular e-commerce websites (Amazon, Flipkart) and performs **sentiment analysis** with visualizations. Users can input a product URL and instantly see a breakdown of positive, neutral, and negative reviews, along with keyword highlights and overall summaries.

---

## **Features**

- **Automatic Review Scraping**
  - Supports Amazon and Flipkart out-of-the-box.
  - Uses Puppeteer to fetch dynamically loaded reviews.
  - Handles multiple pages of reviews automatically.

- **Sentiment Analysis**
  - Analyzes each review for **Positive, Neutral, or Negative** sentiment.
  - Uses **Hugging Face** NLP models.
  - Optionally integrates with Google Gemini API for advanced summarization.

- **Visualization**
  - Pie charts display sentiment distribution.
  - Top positive and negative keywords highlighted.
  - Simple summary generated for quick understanding.

- **React Frontend**
  - Modern UI using React and TailwindCSS.
  - Responsive and interactive interface.
  - Loader animations and hover effects for better UX.

---

## **Getting Started**

### **Prerequisites**
- Node.js v18+  
- npm  
- Chrome (for Puppeteer)  

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd sentiment_analyzer
2. **Install dependencies for backend and frontend:**

   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the `Backend` folder:

   ```
   HF_API_KEY=your_huggingface_api_key
   GEMINI_API_KEY=your_google_gemini_api_key (optional)
   PORT=5000
   ```

---

### **Running the Project**

#### **Backend**

```bash
cd Backend
npm start
```

#### **Frontend**

```bash
cd Frontend
npm start
```

* Open your browser at `http://localhost:3000`.
* Enter a product URL from Amazon or Flipkart and click **"Fetch and Generate Review Analysis"**.

---

## **How It Works**

1. **URL Detection**

   * The app detects the e-commerce site from the URL.
   * Selects the appropriate scraping method and CSS selectors.

2. **Review Scraping**

   * Amazon: Scrapes directly from page HTML.
   * Flipkart: Fetches reviews via API or simulates scrolling/clicking with Puppeteer.

3. **Sentiment Analysis**

   * Reviews are sent to Hugging Face NLP model.
   * Each review is classified as Positive, Neutral, or Negative.
   * Aggregated sentiment percentages are calculated.

4. **Visualization**

   * Frontend displays a **pie chart** of sentiment distribution.
   * Highlights top positive and negative keywords.
   * Generates a 3–4 line summary of overall feedback.

---

## **Technologies Used**

* **Backend:** Node.js, Express, Puppeteer, Hugging Face API
* **Frontend:** React, TailwindCSS, Chart.js
* **Optional AI:** Google Gemini API for review summarization
* **Database:** None required (all real-time fetching)

---

## **Folder Structure**

```
sentiment_analyzer/
│
├── Backend/             # Node.js server & Puppeteer scraper
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── Frontend/            # React frontend
│   ├── src/
│   ├── package.json
│   └── public/
│
└── README.md
```

---

## **Notes**

* **Secrets:** Never commit your API keys. Use `.env` files.
* **Supported Sites:** Amazon.in, Flipkart.com. Easy to extend via `siteConfigs`.
* **Loader Animations:** Loader displays while fetching reviews.
* **Error Handling:** Gracefully handles invalid URLs or sites not supported.

---

## **Future Improvements**

* Add support for more e-commerce sites (Snapdeal, Myntra, etc.).
* Add advanced NLP features like keyword clustering, sentiment trends over time.
* Store scraped reviews in a database for history and analytics.
* Optimize Puppeteer scraping to reduce runtime.

---

## **License**
Developed By Team AlphaQ




