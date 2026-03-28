import { useState } from "react";
import { getLogs, saveLog, getCustomTags, saveCustomTags } from "../hooks/storage";

const ENERGY_OPTIONS = [
  { label: "Drained", value: "low", emoji: "😴" },
  { label: "Neutral", value: "mid", emoji: "😐" },
  { label: "Energized", value: "high", emoji: "⚡" },
];

const INTERACTION_TYPES = ["Work", "Friends", "Family", "Strangers", "Solo"];
const DEFAULT_TAGS = ["crowded", "deep convo", "draining", "fun", "meaningful"];

function EnergySelector({ value, onChange }) {
  return (
    <div className="selector-group">
      <h3>How is your energy level?</h3>
      <div className="selector">
        {ENERGY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`option-btn ${value === opt.value ? "selected" : ""}`}
            onClick={() => onChange(opt.value)}
          >
            <div className="emoji">{opt.emoji}</div>
            <div className="label">{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TypeSelector({ value, onChange }) {
  return (
    <div className="selector-group">
      <h3>Who were you with?</h3>
      <div className="selector">
        {INTERACTION_TYPES.map((type) => (
          <button
            key={type}
            className={`option-btn ${value === type ? "selected" : ""}`}
            onClick={() => onChange(type)}
          >
            <div className="label">{type}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TagSelector({ tags, setTags, allTags, setAllTags }) {
  const [newTagInput, setNewTagInput] = useState("");

  const toggleTag = (tag) => {
    setTags(
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
    );
  };

  const addCustomTag = () => {
    const trimmed = newTagInput.trim().toLowerCase();
    if (trimmed && !allTags.includes(trimmed)) {
      const updated = [...allTags, trimmed];
      setAllTags(updated);
      saveCustomTags(updated);
      setTags([...tags, trimmed]);
    }
    setNewTagInput("");
  };

  return (
    <div className="selector-group">
      <h3>Add tags (optional)</h3>
      <div className="tags-container">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag-btn ${tags.includes(tag) ? "selected" : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="custom-tag-input">
        <input
          type="text"
          placeholder="Type and press Enter to add custom tag"
          value={newTagInput}
          onChange={(e) => setNewTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addCustomTag();
            }
          }}
        />
      </div>
    </div>
  );
}

function JournalStep({ onSubmit, onSkip, prompt }) {
  const [journalText, setJournalText] = useState("");

  return (
    <div className="selector-group journal-step">
      <h3>{prompt || "What stood out about this interaction?"}</h3>
      <textarea
        value={journalText}
        onChange={(e) => setJournalText(e.target.value)}
        placeholder="Write your thoughts here..."
        className="journal-textarea"
      />
      <div className="journal-actions">
        <button
          onClick={() => onSubmit(journalText)}
          className="btn-primary"
        >
          Save Entry
        </button>
        <button onClick={onSkip} className="btn-secondary">
          Skip
        </button>
      </div>
    </div>
  );
}

export default function LogPage({ setScreen }) {
  const [step, setStep] = useState("energy"); // energy -> type -> tags -> journal -> done
  const [energy, setEnergy] = useState(null);
  const [type, setType] = useState(null);
  const [tags, setTags] = useState([]);
  const [customTags, setCustomTags] = useState(
    getCustomTags() || DEFAULT_TAGS
  );

  const handleEnergySelect = (value) => {
    setEnergy(value);
    setStep("type");
  };

  const handleTypeSelect = (value) => {
    setType(value);
    setStep("tags");
  };

  const handleTagsNext = () => {
    setStep("journal");
  };

  const handleJournalSubmit = (journalText) => {
    saveLog({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      energy,
      type,
      tags,
      journal: journalText || null,
    });
    // Reset and go back to analytics
    resetForm();
    setScreen("analytics");
  };

  const handleJournalSkip = () => {
    saveLog({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      energy,
      type,
      tags,
      journal: null,
    });
    resetForm();
    setScreen("analytics");
  };

  const resetForm = () => {
    setStep("energy");
    setEnergy(null);
    setType(null);
    setTags([]);
  };

  return (
    <div className="log-page">
      <div className="log-container">
        <div className="log-header">
          <h1>Log Interaction</h1>
          <p className="progress-indicator">
            Step {step === "energy" ? 1 : step === "type" ? 2 : step === "tags" ? 3 : 4} of 4
          </p>
        </div>

        <div className="log-content">
          {step === "energy" && (
            <EnergySelector value={energy} onChange={handleEnergySelect} />
          )}

          {step === "type" && (
            <div>
              <button
                onClick={() => setStep("energy")}
                className="btn-back"
              >
                ← Back
              </button>
              <TypeSelector value={type} onChange={handleTypeSelect} />
            </div>
          )}

          {step === "tags" && (
            <div>
              <button
                onClick={() => setStep("type")}
                className="btn-back"
              >
                ← Back
              </button>
              <TagSelector
                tags={tags}
                setTags={setTags}
                allTags={customTags}
                setAllTags={setCustomTags}
              />
              <button
                onClick={handleTagsNext}
                className="btn-primary"
              >
                Next →
              </button>
            </div>
          )}

          {step === "journal" && (
            <div>
              <button
                onClick={() => setStep("tags")}
                className="btn-back"
              >
                ← Back
              </button>
              <JournalStep
                onSubmit={handleJournalSubmit}
                onSkip={handleJournalSkip}
                prompt="How was this interaction?"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}