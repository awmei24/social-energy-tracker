import { useState } from "react";
import { getLogs, saveLog, getCustomTags, saveCustomTags } from "../hooks/storage";
import {
  PageHeader,
  SelectorGroup,
  ButtonGrid,
  OptionButton,
  TagsContainer,
  TagButton,
  CustomTagInput,
  JournalTextarea,
  ButtonGroup,
  BackButton,
  PrimaryButton,
  SecondaryButton,
  ProgressIndicator,
} from "../styles/FormStyles";

const ENERGY_OPTIONS = [
  { label: "Drained", value: "low", emoji: "😴" },
  { label: "Neutral", value: "mid", emoji: "😐" },
  { label: "Energized", value: "high", emoji: "⚡" },
];

const INTERACTION_TYPES = ["Work", "Friends", "Family", "Strangers", "Solo"];
const DEFAULT_TAGS = ["crowded", "deep convo", "draining", "fun", "meaningful"];

function EnergySelector({ value, onChange }) {
  return (
    <SelectorGroup>
      <h3>How is your energy level?</h3>
      <ButtonGrid>
        {ENERGY_OPTIONS.map((opt) => (
          <OptionButton
            key={opt.value}
            isSelected={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            <div className="emoji">{opt.emoji}</div>
            <div className="label">{opt.label}</div>
          </OptionButton>
        ))}
      </ButtonGrid>
    </SelectorGroup>
  );
}

function TypeSelector({ value, onChange }) {
  return (
    <SelectorGroup>
      <h3>Who were you with?</h3>
      <ButtonGrid>
        {INTERACTION_TYPES.map((type) => (
          <OptionButton
            key={type}
            isSelected={value === type}
            onClick={() => onChange(type)}
          >
            <div className="label">{type}</div>
          </OptionButton>
        ))}
      </ButtonGrid>
    </SelectorGroup>
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
    <SelectorGroup>
      <h3>Add tags (optional)</h3>
      <TagsContainer>
        {allTags.map((tag) => (
          <TagButton
            key={tag}
            isSelected={tags.includes(tag)}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </TagsContainer>
      <CustomTagInput>
        <input
          type="text"
          placeholder="Add custom tag..."
          value={newTagInput}
          onChange={(e) => setNewTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addCustomTag();
            }
          }}
        />
      </CustomTagInput>
    </SelectorGroup>
  );
}

function JournalStep({ onSubmit, onSkip, prompt }) {
  const [journalText, setJournalText] = useState("");

  return (
    <SelectorGroup>
      <h3>{prompt || "How was this interaction?"}</h3>
      <JournalTextarea
        value={journalText}
        onChange={(e) => setJournalText(e.target.value)}
        placeholder="Write your thoughts here..."
      />
      <ButtonGroup>
        <PrimaryButton onClick={() => onSubmit(journalText)}>
          Save Entry
        </PrimaryButton>
        <SecondaryButton onClick={onSkip}>Skip</SecondaryButton>
      </ButtonGroup>
    </SelectorGroup>
  );
}

export default function LogPage({ setScreen }) {
  const [step, setStep] = useState("energy");
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
    <div>
      <PageHeader>
        <h1>Log Interaction</h1>
        <p className="subtitle">
          Step {step === "energy" ? 1 : step === "type" ? 2 : step === "tags" ? 3 : 4} of 4
        </p>
      </PageHeader>

      {step === "energy" && (
        <EnergySelector value={energy} onChange={handleEnergySelect} />
      )}

      {step === "type" && (
        <div>
          <BackButton onClick={() => setStep("energy")}>← Back</BackButton>
          <TypeSelector value={type} onChange={handleTypeSelect} />
        </div>
      )}

      {step === "tags" && (
        <div>
          <BackButton onClick={() => setStep("type")}>← Back</BackButton>
          <TagSelector
            tags={tags}
            setTags={setTags}
            allTags={customTags}
            setAllTags={setCustomTags}
          />
          <ButtonGroup style={{ marginTop: "32px" }}>
            <PrimaryButton onClick={handleTagsNext}>Next →</PrimaryButton>
          </ButtonGroup>
        </div>
      )}

      {step === "journal" && (
        <div>
          <BackButton onClick={() => setStep("tags")}>← Back</BackButton>
          <JournalStep
            onSubmit={handleJournalSubmit}
            onSkip={handleJournalSkip}
            prompt="How was this interaction?"
          />
        </div>
      )}
    </div>
  );
}