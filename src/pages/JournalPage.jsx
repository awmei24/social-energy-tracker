import { getLogs } from "../hooks/storage";

export default function JournalPage() {
  const logs = getLogs();
  const journalEntries = logs.filter((log) => log.journal && log.journal.trim());

  // Sort by most recent first
  const sortedEntries = [...journalEntries].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div className="journal-page">
      <div className="journal-container">
        <div className="journal-header">
          <h1>Digital Journal</h1>
          <p className="journal-count">
            {journalEntries.length} journal {journalEntries.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        {sortedEntries.length === 0 ? (
          <div className="empty-state">
            <p>No journal entries yet.</p>
            <p className="empty-hint">Log an interaction and add a journal entry to see it here.</p>
          </div>
        ) : (
          <div className="journal-entries">
            {sortedEntries.map((entry) => (
              <div key={entry.id} className="journal-entry-card">
                <div className="entry-header">
                  <div className="entry-date">
                    <div className="date-text">
                      {new Date(entry.timestamp).toLocaleDateString([], {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="time-text">
                      {new Date(entry.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="entry-context">
                    <span className={`energy-badge ${entry.energy}`}>
                      {entry.energy === "low"
                        ? "😴 Drained"
                        : entry.energy === "mid"
                        ? "😐 Neutral"
                        : "⚡ Energized"}
                    </span>
                    <span className="type-badge">{entry.type}</span>
                  </div>
                </div>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="entry-tags">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="tag-badge">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="entry-content">
                  <p>{entry.journal}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}