import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import StartPage from "./components/StartPage.jsx";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [url, setUrl] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   if (tabs[0]) {
    //     const currentUrl = tabs[0].url;
    //     setUrl(currentUrl);
    //     fetchReviews(currentUrl);
    //   }
    // });
    fetchReviews(
      "https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX2F5QT?pd_rd_w=NCpDG&content-id=amzn1.sym.a324903e-1f30-4243-bf0d-6da5ebc52115&pf_rd_p=a324903e-1f30-4243-bf0d-6da5ebc52115&pf_rd_r=SSSGQ9HW3PJS8ZGAT325&pd_rd_wg=jDCCi&pd_rd_r=7c4e8e9f-bf77-44f3-b44d-2dba56e1592f&pd_rd_i=B0CHX2F5QT&ref_=pd_hp_d_btf_unk_B0CHX2F5QT&th=1"
    );
  }, []);

  const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex space-x-2 mb-3">
          <div className="w-4 h-4 bg-amber-600 rounded-full animate-bounce delay-75"></div>
          <div className="w-4 h-4 bg-amber-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-amber-600 rounded-full animate-bounce delay-300"></div>
        </div>

        <h2 className="text-blue-900 font-semibold text-lg animate-pulse">
          Loading . . .
        </h2>
      </div>
    );
  };

  const PieChart = ({
    chartData = { Positive: 5, Neutral: 2, Negative: 3 },
  }) => {
    const data = {
      labels: Object.keys(chartData),
      datasets: [
        {
          label: "Sentiment Distribution",
          data: Object.values(chartData),
          backgroundColor: [
            "rgba(34,197,94,0.7)", // green
            "rgba(234,179,8,0.7)", // yellow
            "rgba(239,68,68,0.7)", // red
          ],
          borderColor: [
            "rgba(34,197,94,1)",
            "rgba(234,179,8,1)",
            "rgba(239,68,68,1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    };
    return (
      <Pie key={JSON.stringify(chartData)} data={data} options={options} />
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
      setReviews(data.reviews);
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

  return(
    <>
      <StartPage onAnalyzeClick={handleAnalyzeClick} currentUrl={"www.amazon.com"} />
      <PieChart/>
    </>
  )
}

export default App;
