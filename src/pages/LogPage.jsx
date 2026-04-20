import { useState } from "react";
import { getLogs, saveLog, getCustomTags, saveCustomTags } from "../hooks/storage";
import drainedDark from "../assets/drained-dark.svg";
import drainedLight from "../assets/drained-lightest.svg";
import neutralDark from "../assets/neutral-dark.svg";
import neutralLight from "../assets/neutral-lightest.svg";
import energizedDark from "../assets/energized-dark.svg";
import energizedLight from "../assets/energized-lightest.svg";
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
  { label: "Drained", value: "low", iconDark: drainedDark, iconLight: drainedLight },
  { label: "Neutral", value: "mid", iconDark: neutralDark, iconLight: neutralLight },
  { label: "Energized", value: "high", iconDark: energizedDark, iconLight: energizedLight },
];

const INTERACTION_TYPES = ["colleagues", "friends", "family", "strangers", "solo"];
const DEFAULT_TAGS = ["crowded", "deep convo", "draining", "", "meaningful"];

const JOURNAL_PROMPTS = [
  "What made this interaction feel the way it did?",
  "How did your energy shift from before to after?",
  "Was there a moment during this interaction that stood out?",
  "What did you learn about yourself today?",
  "Were you able to be fully present? What made that easy or hard?",
  "What would you do differently if you could replay this interaction?",
  "Did anything surprise you about how you felt?",
  "How much of yourself did you share — and does that feel right?",
  "What were you secretly hoping for going in?",
  "Did this interaction bring you closer to or further from the other person?",
  "What emotion showed up that you weren't expecting?",
  "Was there something left unsaid? What was it?",
  "What pattern in yourself did you notice today?",
  "How did the setting or environment affect the interaction?",
  "What are you carrying with you from this interaction?",
  "Did you feel seen and heard? Why or why not?",
  "What did you need during this interaction that you didn't ask for?",
  "What drained you most — and what, if anything, refueled you?",
  "What do you want to remember about this moment?",
  "If a close friend had this same interaction, what would you tell them?",
];

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
            <img
              className="emoji"
              src={value === opt.value ? opt.iconLight : opt.iconDark}
              alt={opt.label}
            />
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
      <h3>Take a moment to reflect</h3>
      {prompt && (
        <div style={{
          background: "rgba(62, 92, 118, 0.06)",
          borderLeft: "3px solid #3E5C76",
          borderRadius: "0 6px 6px 0",
          padding: "12px 16px",
          fontStyle: "italic",
          fontSize: "14px",
          color: "#3E5C76",
          lineHeight: "1.5",
        }}>
          {prompt}
        </div>
      )}
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
  const [prompt, setPrompt] = useState("");

  const handleEnergySelect = (value) => {
    setEnergy(value);
    setStep("type");
  };

  const handleTypeSelect = (value) => {
    setType(value);
    setStep("tags");
  };

  const handleTagsNext = () => {
    const randomPrompt = JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
    setPrompt(randomPrompt);
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
    setPrompt("");
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
            prompt={prompt}
          />
        </div>
      )}
    </div>
  );
}