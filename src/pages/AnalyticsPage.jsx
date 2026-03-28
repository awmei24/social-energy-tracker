import { useMemo } from "react";
import { getLogs } from "../hooks/storage";

export default function AnalyticsPage() {
  const logs = getLogs();

  const stats = useMemo(() => {
    const energyCounts = { low: 0, mid: 0, high: 0 };
    const typeCounts = {};
    const tagCounts = {};
    const timelineData = {};

    logs.forEach((log) => {
      // Energy counts
      energyCounts[log.energy]++;

      // Type counts
      typeCounts[log.type] = (typeCounts[log.type] || 0) + 1;

      // Tag counts
      log.tags?.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });

      // Timeline (by day)
      const date = new Date(log.timestamp).toLocaleDateString();
      if (!timelineData[date]) {
        timelineData[date] = { low: 0, mid: 0, high: 0, count: 0 };
      }
      timelineData[date][log.energy]++;
      timelineData[date].count++;
    });

    return { energyCounts, typeCounts, tagCounts, timelineData };
  }, [logs]);

  const totalLogs = logs.length;

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p className="total-logs">Total interactions logged: {totalLogs}</p>
        </div>

        {totalLogs === 0 ? (
          <div className="empty-state">
            <p>No data yet. Start logging your interactions!</p>
          </div>
        ) : (
          <div className="analytics-content">
            {/* Energy Distribution */}
            <section className="analytics-section">
              <h2>Energy Levels</h2>
              <div className="energy-chart">
                <div className="energy-item">
                  <div className="energy-label">
                    <span className="emoji">😴</span> Drained
                  </div>
                  <div className="energy-bar">
                    <div
                      className="energy-fill low"
                      style={{
                        width: `${(stats.energyCounts.low / totalLogs) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="energy-count">
                    {stats.energyCounts.low}
                    <span className="percent">
                      ({Math.round((stats.energyCounts.low / totalLogs) * 100)}%)
                    </span>
                  </span>
                </div>

                <div className="energy-item">
                  <div className="energy-label">
                    <span className="emoji">😐</span> Neutral
                  </div>
                  <div className="energy-bar">
                    <div
                      className="energy-fill mid"
                      style={{
                        width: `${(stats.energyCounts.mid / totalLogs) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="energy-count">
                    {stats.energyCounts.mid}
                    <span className="percent">
                      ({Math.round((stats.energyCounts.mid / totalLogs) * 100)}%)
                    </span>
                  </span>
                </div>

                <div className="energy-item">
                  <div className="energy-label">
                    <span className="emoji">⚡</span> Energized
                  </div>
                  <div className="energy-bar">
                    <div
                      className="energy-fill high"
                      style={{
                        width: `${(stats.energyCounts.high / totalLogs) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="energy-count">
                    {stats.energyCounts.high}
                    <span className="percent">
                      ({Math.round((stats.energyCounts.high / totalLogs) * 100)}%)
                    </span>
                  </span>
                </div>
              </div>
            </section>

            {/* Interaction Types */}
            <section className="analytics-section">
              <h2>Interaction Types</h2>
              <div className="type-chart">
                {Object.entries(stats.typeCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, count]) => (
                    <div key={type} className="type-item">
                      <span className="type-name">{type}</span>
                      <span className="type-count">{count}</span>
                    </div>
                  ))}
              </div>
            </section>

            {/* Top Tags */}
            {Object.keys(stats.tagCounts).length > 0 && (
              <section className="analytics-section">
                <h2>Top Tags</h2>
                <div className="tags-chart">
                  {Object.entries(stats.tagCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([tag, count]) => (
                      <div key={tag} className="tag-stat">
                        <span className="tag-name">{tag}</span>
                        <span className="tag-count">{count}</span>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Recent Timeline */}
            <section className="analytics-section">
              <h2>Recent Activity</h2>
              <div className="timeline">
                {Object.entries(stats.timelineData)
                  .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                  .slice(0, 7)
                  .map(([date, data]) => (
                    <div key={date} className="timeline-item">
                      <div className="timeline-date">{date}</div>
                      <div className="timeline-bars">
                        <div className="timeline-bar-group">
                          <div className="bar low" title={`${data.low} drained`}>
                            <span className="bar-height">{data.low > 0 ? data.low : ""}</span>
                          </div>
                          <div className="bar mid" title={`${data.mid} neutral`}>
                            <span className="bar-height">{data.mid > 0 ? data.mid : ""}</span>
                          </div>
                          <div className="bar high" title={`${data.high} energized`}>
                            <span className="bar-height">{data.high > 0 ? data.high : ""}</span>
                          </div>
                        </div>
                        <div className="total-interactions">
                          {data.count} interactions
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* All Logs Table */}
            <section className="analytics-section">
              <h2>All Interactions</h2>
              <div className="logs-table">
                {logs.map((log) => (
                  <div key={log.id} className="log-entry">
                    <div className="log-entry-header">
                      <span className="log-date">
                        {new Date(log.timestamp).toLocaleDateString()} at{" "}
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div className="log-badges">
                        <span className={`energy-badge ${log.energy}`}>
                          {log.energy === "low"
                            ? "😴 Drained"
                            : log.energy === "mid"
                            ? "😐 Neutral"
                            : "⚡ Energized"}
                        </span>
                        <span className="type-badge">{log.type}</span>
                      </div>
                    </div>
                    {log.tags && log.tags.length > 0 && (
                      <div className="log-tags">
                        {log.tags.map((tag) => (
                          <span key={tag} className="tag-badge">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {log.journal && (
                      <div className="log-journal">
                        <p>{log.journal}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}