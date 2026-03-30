import { useMemo } from "react";
import { getLogs } from "../hooks/storage";
import {
  AnalyticsContainer,
  Section,
  Card,
  EnergyChart,
  EnergyItem,
  TypeChart,
  ChartItem,
  Timeline,
  TimelineItem,
  LogEntry,
  Badge,
  EmptyState,
  PageHeader,
} from "../styles/AnalyticsStyles";

export default function AnalyticsPage() {
  const logs = getLogs();

  const stats = useMemo(() => {
    const energyCounts = { low: 0, mid: 0, high: 0 };
    const typeCounts = {};
    const tagCounts = {};
    const timelineData = {};

    logs.forEach((log) => {
      energyCounts[log.energy]++;
      typeCounts[log.type] = (typeCounts[log.type] || 0) + 1;

      log.tags?.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });

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
    <div>
      <PageHeader>
        <h1>Analytics</h1>
        <p className="subtitle">Total interactions: {totalLogs}</p>
      </PageHeader>

      {totalLogs === 0 ? (
        <EmptyState>
          <p>No data yet. Start logging your interactions!</p>
        </EmptyState>
      ) : (
        <AnalyticsContainer>
          {/* Energy Distribution */}
          <Section>
            <h2>Energy Levels</h2>
            <Card>
              <EnergyChart>
                <EnergyItem>
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
                </EnergyItem>

                <EnergyItem>
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
                </EnergyItem>

                <EnergyItem>
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
                </EnergyItem>
              </EnergyChart>
            </Card>
          </Section>

          {/* Interaction Types */}
          <Section>
            <h2>Interaction Types</h2>
            <Card>
              <TypeChart>
                {Object.entries(stats.typeCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, count]) => (
                    <ChartItem key={type}>
                      <span className="label">{type}</span>
                      <span className="count">{count}</span>
                    </ChartItem>
                  ))}
              </TypeChart>
            </Card>
          </Section>

          {/* Top Tags */}
          {Object.keys(stats.tagCounts).length > 0 && (
            <Section>
              <h2>Top Tags</h2>
              <Card>
                <TypeChart>
                  {Object.entries(stats.tagCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([tag, count]) => (
                      <ChartItem key={tag}>
                        <span className="label">{tag}</span>
                        <span className="count">{count}</span>
                      </ChartItem>
                    ))}
                </TypeChart>
              </Card>
            </Section>
          )}

          {/* Recent Timeline */}
          <Section>
            <h2>Recent Activity</h2>
            <Card>
              <Timeline>
                {Object.entries(stats.timelineData)
                  .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                  .slice(0, 7)
                  .map(([date, data]) => (
                    <TimelineItem key={date}>
                      <div className="timeline-date">{date}</div>
                      <div className="timeline-bars">
                        {data.low > 0 && (
                          <div
                            className="bar low"
                            style={{ height: `${(data.low / (data.low + data.mid + data.high)) * 100}%` }}
                          />
                        )}
                        {data.mid > 0 && (
                          <div
                            className="bar mid"
                            style={{ height: `${(data.mid / (data.low + data.mid + data.high)) * 100}%` }}
                          />
                        )}
                        {data.high > 0 && (
                          <div
                            className="bar high"
                            style={{ height: `${(data.high / (data.low + data.mid + data.high)) * 100}%` }}
                          />
                        )}
                      </div>
                      <div className="total-count">{data.count} interactions</div>
                    </TimelineItem>
                  ))}
              </Timeline>
            </Card>
          </Section>

          {/* All Logs */}
          <Section>
            <h2>All Interactions</h2>
            <Card>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {logs.map((log) => (
                  <LogEntry key={log.id}>
                    <div className="entry-header">
                      <div className="date-info">
                        <span className="date">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </span>
                        <span className="time">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="badges">
                        <Badge type={log.energy}>
                          {log.energy === "low"
                            ? "😴 Drained"
                            : log.energy === "mid"
                            ? "😐 Neutral"
                            : "⚡ Energized"}
                        </Badge>
                        <Badge type="type">{log.type}</Badge>
                      </div>
                    </div>
                    {log.tags && log.tags.length > 0 && (
                      <div className="tags">
                        {log.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {log.journal && (
                      <div className="journal">
                        <p>{log.journal}</p>
                      </div>
                    )}
                  </LogEntry>
                ))}
              </div>
            </Card>
          </Section>
        </AnalyticsContainer>
      )}
    </div>
  );
}