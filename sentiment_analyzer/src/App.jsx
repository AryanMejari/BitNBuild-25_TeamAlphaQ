import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [url, setUrl] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const currentUrl = tabs[0].url;
        setUrl(currentUrl);
        fetchReviews(currentUrl);
      }
    });
    // fetchReviews("https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX2F5QT?pd_rd_w=NCpDG&content-id=amzn1.sym.a324903e-1f30-4243-bf0d-6da5ebc52115&pf_rd_p=a324903e-1f30-4243-bf0d-6da5ebc52115&pf_rd_r=SSSGQ9HW3PJS8ZGAT325&pd_rd_wg=jDCCi&pd_rd_r=7c4e8e9f-bf77-44f3-b44d-2dba56e1592f&pd_rd_i=B0CHX2F5QT&ref_=pd_hp_d_btf_unk_B0CHX2F5QT&th=1");
  }, []);
  
  const fetchReviews = async (productUrl) => {
  setLoading(true);
  try {
    const response = await axios.post("http://localhost:5000/scrape", {
      url: productUrl,
    });
    console.log(response)
    const data = response.data;
    setReviews(data.reviews);
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch reviews");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4 w-[400px]">

      {/* {loading ? (
        <p className="mt-4">Fetching reviews...</p>
      ) : (
        <ul className="mt-4 list-disc list-inside max-h-[300px] overflow-y-auto">
          {reviews.map((review, idx) => (
            <li key={idx} className="my-1 p-1 border rounded">
              {review}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default App
