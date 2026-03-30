import { NavBar, NavButton } from "../styles/BottomNavStyles";

export default function BottomNav({ screen, setScreen }) {
  const tabs = [
    { id: "log", icon: "➕", label: "Log" },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "journal", icon: "📓", label: "Journal" },
  ];

  return (
    <NavBar>
      {tabs.map((tab) => (
        <NavButton
          key={tab.id}
          onClick={() => setScreen(tab.id)}
          isActive={screen === tab.id}
          title={tab.label}
        >
          <span className="icon">{tab.icon}</span>
          <span className="label">{tab.label}</span>
        </NavButton>
      ))}
    </NavBar>
  );
}