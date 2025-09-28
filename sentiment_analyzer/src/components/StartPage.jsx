import React, { useState } from "react";
import logo from "../assets/logo.png";

const StartPage = ({ onAnalyzeClick, currentUrl }) => {
  const [inputUrl, setInputUrl] = useState();

  const handleInput = (e) => {
    setInputUrl(e.value);
  };

  return (
    <div className="p-6 w-[400px] min-h-[450px] bg-gradient-to-br rounded-2xl from-gray-800 via-gray-700 to-gray-900 ">
      {/* Header with Logo and Name on same line */}

      <header className="flex items-center justify-center mb-8 gap-4">
        <div className="w-20 h-20 bg-gradient-to-br  rounded-full flex items-center justify-center shadow-lg">
          <img
            src={logo}
            className="w-20 h-20 object-contain rounded-full"
            alt="Review Radar Logo"
          />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-white">Review Radar</h1>
          <p className="text-gray-300 text-sm">AI-Powered Analysis</p>
        </div>
      </header>

      {/* Current site indicator */}
      {true && (
        <div className="mb-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-300">Website:</span>
            <div>
              <input
                type="text"
                placeholder="Enter URL"
                id="first_name"
                onInput={(e) => handleInput(e.target)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">
          Ready to Analyze Reviews
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          Get instant insights from customer reviews with AI-powered sentiment
          analysis and keyword extraction.
        </p>
      </div>

      {/* Analyze button */}
      <button
        onClick={() => onAnalyzeClick(inputUrl)}
        className="relative overflow-hidden bg-transparent border-2 border-gray-300 text-gray-200 font-bold py-8 px-24 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(229,231,235,0.40)] group backdrop-blur-sm"
      >
        <span className="relative z-10 tracking-wider">
          Generate Review Analysis
        </span>
        <div className="absolute inset-0 bg-gray-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <div className="absolute -inset-1 bg-gray-300 rounded-xl blur opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
      </button>
      <br/>
      <button
        onClick={() => onAnalyzeClick()}
        className="relative overflow-hidden mt-5 bg-transparent border-2 border-blue-600 text-blue-300 font-bold py-8 px-24 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.40)] group backdrop-blur-sm"
      >
        <span className="relative z-10 tracking-wider">
          Fetch and Generate Review Analysis
        </span>
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <div className="absolute -inset-1 bg-blue-600 rounded-xl blur opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
      </button>

      {/* Footer */}

      <footer className="mt-6 pt-4 border-t border-gray-600 ">
        <p className="text-center text-xs text-gray-400">
          Made by{" "}
          <span className="text-blue-400 font-medium">Team Alpha Q</span>
        </p>
      </footer>
    </div>
  );
};

export default StartPage;
