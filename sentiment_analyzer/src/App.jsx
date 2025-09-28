import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import StartPage from "./components/StartPage.jsx";
import ResultsPage from "./components/ResultsPage.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [url, setUrl] = useState("");
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   if (tabs[0]) {
    //     const currentUrl = tabs[0].url;
    //     setUrl(currentUrl);
    //   }
    // });
  }, []);

  const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center p-4 w-[500px] min-h-[450px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
        <div className="flex space-x-2 mb-3">
          <div className="w-4 h-4 bg-amber-600 rounded-full animate-bounce delay-75"></div>
          <div className="w-4 h-4 bg-amber-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-amber-600 rounded-full animate-bounce delay-300"></div>
        </div>
        <h2 className="text-white font-semibold text-lg animate-pulse">
          Fetching Reviews . . .
        </h2>
      </div>
    );
  };

  const fetchReviews = async (productUrl) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/scrape", {
        url: productUrl,
      });
      console.log(response);
      const data = response.data;
      setReviews(response.data);
    } catch (err) {
      console.error(err);
      console.log("Failed to fetch reviews");
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnalyzeClick = (link=url) => {
    if (link) {
      setShowResults(true);
      fetchReviews(link);
    }else{
      console.error("Link not found !!")
    }
  };

  const handleBackToStart = () => {
    setShowResults(false);
    setReviews([]);
  };

  console.log(reviews)

  if (loading) {
    return <Loader />;
  }

  if (showResults) {
    return <ResultsPage onBack={handleBackToStart} reviews={reviews} />;
  }

  return <StartPage onAnalyzeClick={handleAnalyzeClick} currentUrl={url} />;
}

export default App;

