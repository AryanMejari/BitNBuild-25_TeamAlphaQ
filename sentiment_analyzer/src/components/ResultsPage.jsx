import React from 'react';
import { Pie } from "react-chartjs-2";
import logo from '../assets/logo.png';

const ResultsPage = ({ onBack, reviews }) => {
  // Dummy data for demo
  const dummySummary = {
    keyInsights: reviews.gem.summary
  };

  console.log(reviews.gem.positive_keywords)
  
  const dummyKeywords = {
    positive:reviews.gem.positive_keywords,
    negative: reviews.gem.negative_keywords
  };

  const dummyChartData = { 
    Positive: parseFloat(reviews.review.Positive), 
    Neutral: parseFloat(reviews.review.Neutral), 
    Negative: parseFloat(reviews.review.Negative) 
  };


  const pieData = {
    labels: Object.keys(dummyChartData),
    datasets: [
      {
        label: "Sentiment Distribution",
         data:Object.values(dummyChartData),
        backgroundColor: [
          "rgba(74, 222, 128, 0.8)", // green-400
          "rgba(250, 204, 21, 0.8)", // yellow-400
          "rgba(248, 113, 113, 0.8)", // red-400
        ],
        borderColor: [
          "rgba(74, 222, 128, 1)",
          "rgba(250, 204, 21, 1)",
          "rgba(248, 113, 113, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4
      },
    ],
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#D1D5DB", // gray-300
          font: {
            size: 12
          },
          padding: 15,
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        }
      },
      tooltip: {
        backgroundColor: '#1F2937', // gray-800
        titleColor: '#F9FAFB', // gray-50
        bodyColor: '#D1D5DB', // gray-300
        padding: 10,
        cornerRadius: 4
      }
    },
  };

  return (
    <div className="w-[500px] min-h-[450px] flex flex-col bg-gradient-to-br  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const currentUrl = tabs[0].url;
        setUrl(currentUrl);
        fetchReviews(currentUrl);
      }
    }); from-gray-800 via-gray-700 to-gray-900 text-gray-200 font-sans relative">
      
      <header className="flex items-center justify-center p-4 border-b border-gray-700/50 shrink-0 relative mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-100">Review Analysis</h1>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        
        {/* Summary Section */}
        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50 mb-6">
          <h2 className="font-semibold text-xl text-white mb-3">Summary</h2>
          
           {/* <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center bg-gray-700/50 rounded-lg p-2">
              <p className="text-2xl font-bold text-blue-400">{dummySummary.totalReviews.toLocaleString()}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Reviews</p>
            </div>
            <div className="text-center bg-gray-700/50 rounded-lg p-2">
              <p className="text-2xl font-bold text-green-400">{dummySummary.averageRating}★</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Avg Rating</p>
            </div>
          </div>
          <div className="text-center mb-3 bg-gray-700/50 rounded-lg py-2">
            <p className="text-md font-medium text-yellow-300">{dummySummary.overallSentiment}</p>
          </div> */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <p className="text-sm text-gray-300 leading-relaxed">{dummySummary.keyInsights}</p>
          </div>
        </div>

        {/* Sentiment Distribution Section */}
        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50 mb-6">
          <h2 className="font-semibold text-xl text-white mb-2">Sentiment Distribution</h2>
          <div className="h-48 w-full flex justify-center items-center">
             <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Keywords Section */}
        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50 backdrop-blur-sm">
          <h2 className="font-semibold text-xl text-white mb-4">Top Keywords</h2>
          
          {/* Positive Keywords */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 shadow-sm shadow-green-400/50"></div>
              <h3 className="text-sm font-medium text-green-400 ">Positive Keywords</h3>
            </div>
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 rounded-lg p-3 border border-green-700/30">
              <div className="flex flex-wrap gap-2">
                {dummyKeywords.positive.slice(0, 8).map((keyword, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-2 bg-gradient-to-r from-green-600/50 to-green-500/40 text-green-100 rounded-md text-xs font-medium 
                    hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 hover:from-green-500/60 hover:to-green-400/50
                    transition-all duration-200 cursor-pointer select-none
                    relative overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent 
                    before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Negative Keywords */}
          <div>
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 shadow-sm shadow-red-400/50"></div>
              <h3 className="text-sm font-medium text-red-400">Negative Keywords</h3>
            </div>
            <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 rounded-lg p-3 border border-red-700/30">
              <div className="flex flex-wrap gap-2">
                {dummyKeywords.negative.slice(0, 8).map((keyword, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-2 bg-gradient-to-r from-red-600/50 to-red-500/40 text-red-100 rounded-md text-xs font-medium 
                    hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 hover:from-red-500/60 hover:to-red-400/50
                    transition-all duration-200 cursor-pointer select-none
                    relative overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent 
                    before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer className="p-3 border-t border-gray-700/50 text-center shrink-0">
        <p className="text-xs text-gray-500">
          Made by <span className="text-blue-400 font-medium">Team Alpha Q</span>
        </p>
      </footer>
    </div>
  );
};

export default ResultsPage;
