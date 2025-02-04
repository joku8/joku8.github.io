import React, { useState } from "react";
import LandingPage from "./landing_page/LandingPage";
import Portfolio from "./portfolio/Portfolio"; // Import the Portfolio component

const App: React.FC = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#ffffff", // Ensures background is always white
        height: "100vh",
        width: "100vw",
      }}
    >
      {showPortfolio ? (
        <Portfolio />
      ) : (
        <LandingPage setShowPortfolio={setShowPortfolio} />
      )}
    </div>
  );
};

export default App;
