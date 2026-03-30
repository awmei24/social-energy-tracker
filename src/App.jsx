import { useState } from "react";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AppContainer, MainContent, ContentWrapper } from "./styles/AppStyles";
import BottomNav from "./components/BottomNav";
import LogPage from "./pages/LogPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import JournalPage from "./pages/JournalPage";

export default function App() {
  const [screen, setScreen] = useState("analytics");

  return (
    <AppContainer>
      <GlobalStyle />
      <MainContent>
        <ContentWrapper>
          {screen === "log" && <LogPage setScreen={setScreen} />}
          {screen === "analytics" && <AnalyticsPage />}
          {screen === "journal" && <JournalPage />}
        </ContentWrapper>
      </MainContent>

      <BottomNav screen={screen} setScreen={setScreen} />
    </AppContainer>
  );
}