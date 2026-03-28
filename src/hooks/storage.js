const LOGS_KEY = "social-energy-logs";
const TAGS_KEY = "social-energy-custom-tags";
const DEFAULT_TAGS = ["crowded", "deep convo", "draining", "fun", "meaningful"];

export function getLogs() {
  const stored = localStorage.getItem(LOGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveLog(log) {
  const logs = getLogs();
  const updated = [log, ...logs];
  localStorage.setItem(LOGS_KEY, JSON.stringify(updated));
}

export function deleteLog(logId) {
  const logs = getLogs();
  const updated = logs.filter((log) => log.id !== logId);
  localStorage.setItem(LOGS_KEY, JSON.stringify(updated));
}

export function getCustomTags() {
  const stored = localStorage.getItem(TAGS_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_TAGS;
}

export function saveCustomTags(tags) {
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
}

export function resetAllData() {
  localStorage.removeItem(LOGS_KEY);
  localStorage.removeItem(TAGS_KEY);
}