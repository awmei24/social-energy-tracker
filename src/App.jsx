import { useState } from "react";
import BottomNav from "./components/BottomNav";
import LogPage from "./pages/LogPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import JournalPage from "./pages/JournalPage";

export default function App() {
  const [screen, setScreen] = useState("analytics");

  return (
    <div className="app-container">
      {screen === "log" && <LogPage setScreen={setScreen} />}
      {screen === "analytics" && <AnalyticsPage />}
      {screen === "journal" && <JournalPage />}

      <BottomNav screen={screen} setScreen={setScreen} />
    </div>
  );
}