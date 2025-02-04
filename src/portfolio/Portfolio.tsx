import React, { useEffect, useState } from "react";

const Portfolio: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100); // Small delay before applying fade-in

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: "3vh",
        color: "black",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      Welcome to my portfolio!
    </div>
  );
};

export default Portfolio;
