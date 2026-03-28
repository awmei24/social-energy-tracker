export default function BottomNav({ screen, setScreen }) {
  const tabs = [
    { id: "log", icon: "➕", label: "Log Interaction" },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "journal", icon: "📓", label: "Digital Journal" },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setScreen(tab.id)}
          className={`nav-btn ${screen === tab.id ? "active" : ""}`}
          title={tab.label}
        >
          <span className="icon">{tab.icon}</span>
          <span className="label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}