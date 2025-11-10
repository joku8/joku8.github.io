import React, { useState } from "react";
import LandingPage from "./landing_page/LandingPage";
import Portfolio from "./portfolio/Portfolio";
import { Container, Card, MantineProvider } from "@mantine/core";

const App: React.FC = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const backgroundStyle = {
    backgroundImage: 'url("/images/farmland.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '99vw',
  };

  return (
    <div
      style={backgroundStyle}
    >
      {showPortfolio ? (
        <MantineProvider>
          <Container size="lg" pt="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Portfolio />
            </Card>
          </Container>
        </MantineProvider>
      ) : (
        <LandingPage setShowPortfolio={setShowPortfolio} />
      )}
    </div>
  );
};

export default App;
