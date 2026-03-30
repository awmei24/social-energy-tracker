import { getLogs } from "../hooks/storage";
import {
  JournalContainer,
  JournalEntryCard,
  EntryBadge,
  EmptyState,
  PageHeader,
} from "../styles/JournalStyles";

export default function JournalPage() {
  const logs = getLogs();
  const journalEntries = logs.filter((log) => log.journal && log.journal.trim());

  const sortedEntries = [...journalEntries].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div>
      <PageHeader>
        <h1>Digital Journal</h1>
        <p className="subtitle">
          {journalEntries.length} journal {journalEntries.length === 1 ? "entry" : "entries"}
        </p>
      </PageHeader>

      {sortedEntries.length === 0 ? (
        <EmptyState>
          <p>No journal entries yet.</p>
          <p className="hint">Log an interaction and add a journal entry to see it here.</p>
        </EmptyState>
      ) : (
        <JournalContainer>
          {sortedEntries.map((entry) => (
            <JournalEntryCard key={entry.id}>
              <div className="entry-header">
                <div className="date-info">
                  <div className="date">
                    {new Date(entry.timestamp).toLocaleDateString([], {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="time">
                    {new Date(entry.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="context-badges">
                  <EntryBadge energyType={entry.energy}>
                    {entry.energy === "low"
                      ? "😴 Drained"
                      : entry.energy === "mid"
                      ? "😐 Neutral"
                      : "⚡ Energized"}
                  </EntryBadge>
                  <EntryBadge energyType="type">{entry.type}</EntryBadge>
                </div>
              </div>

              {entry.tags && entry.tags.length > 0 && (
                <div className="tags-section">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="content-section">
                <p>{entry.journal}</p>
              </div>
            </JournalEntryCard>
          ))}
        </JournalContainer>
      )}
    </div>
  );
}