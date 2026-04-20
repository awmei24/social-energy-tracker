import { NavBar, NavButton } from "../styles/BottomNavStyles";
import logIcon from "../assets/log-lightest.svg";
import analyticsIcon from "../assets/analytics-lightest.svg";
import journalIcon from "../assets/journal-lightest.svg";

const tabs = [
  { id: "log", icon: logIcon, label: "Log" },
  { id: "analytics", icon: analyticsIcon, label: "Analytics" },
  { id: "journal", icon: journalIcon, label: "Journal" },
];

export default function BottomNav({ screen, setScreen }) {
  return (
    <NavBar>
      {tabs.map((tab) => (
        <NavButton
          key={tab.id}
          onClick={() => setScreen(tab.id)}
          isActive={screen === tab.id}
          title={tab.label}
        >
          <img className="icon" src={tab.icon} alt={tab.label} />
          <span className="label">{tab.label}</span>
        </NavButton>
      ))}
    </NavBar>
  );
}