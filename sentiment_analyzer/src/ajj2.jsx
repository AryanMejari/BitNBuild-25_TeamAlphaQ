import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import StartPage from './components/StartPage.jsx';
import Loader from './components/Loader.jsx';

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          const currentUrl = tabs[0].url;
          setUrl(currentUrl);
        }
      });
    } else {
      console.log('Chrome extension APIs not available - running in development mode');
      setUrl("https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX2F5QT");
    }
  }, []);
  
  const fetchReviews = async (productUrl) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/scrape", {
        url: productUrl,
      });
      console.log(response)
      const data = response.data;
      // Handle response here when ready
    } catch (err) {
      console.error(err);
      console.log("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeClick = () => {
    if (url) {
      fetchReviews(url);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return <StartPage onAnalyzeClick={handleAnalyzeClick} currentUrl={url} />;
}

export default App
