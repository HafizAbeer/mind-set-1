import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mindsetScreeningSelection";
const CHANGE_EVENT = "mindset-screening-selection-change";

export const screeningDefaults = {
  mindsetLabel: "mindset",
  mindsetCategory: "Unclear",
  mindsetPhrase: "mindset",
  mindsetSentence: "I feel [mindset] by [trigger]",
  triggerLabel: "trigger",
  successRating: "",
  selectedReward: "",
  causeLabel: "cause",
  bodyStructureLabel: "body structure",
  symptomSummary: "symptom",
  intentionLabel: "Intention",
  lifeScriptLabel: "life script",
  lifeScriptSentence: "My life script is [label]",
  oldScriptSummary: "old script/s",
  oldScriptSentence: "My old script is [label]",
  newScriptSummary: "new script/s",
  newScriptSentence: "My new script is [label]",
  reflectionATitle: "",
  reflectionAValue: "",
  reflectionBTitle: "",
  reflectionBValue: "",
};

function readStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function resolveLabel(value, fallback) {
  if (typeof value !== "string") return fallback;
  const t = value.trim();
  return t ? t : fallback;
}

export function getScreeningSelection() {
  const raw = readStored();
  return {
    mindsetLabel: resolveLabel(raw.mindsetLabel, screeningDefaults.mindsetLabel),
    mindsetCategory: resolveLabel(
      raw.mindsetCategory,
      screeningDefaults.mindsetCategory
    ),
    successRating: resolveLabel(raw.successRating, screeningDefaults.successRating),
    selectedReward: resolveLabel(raw.selectedReward, screeningDefaults.selectedReward),
    mindsetPhrase: resolveLabel(raw.mindsetPhrase, screeningDefaults.mindsetPhrase),
    mindsetSentence: resolveLabel(raw.mindsetSentence, screeningDefaults.mindsetSentence),
    triggerLabel: resolveLabel(raw.triggerLabel, screeningDefaults.triggerLabel),
    causeLabel: resolveLabel(raw.causeLabel, screeningDefaults.causeLabel),
    bodyStructureLabel: resolveLabel(
      raw.bodyStructureLabel,
      screeningDefaults.bodyStructureLabel
    ),
    symptomSummary: resolveLabel(
      raw.symptomSummary,
      screeningDefaults.symptomSummary
    ),
    intentionLabel: resolveLabel(
      raw.intentionLabel,
      screeningDefaults.intentionLabel
    ),
    lifeScriptLabel: resolveLabel(
      raw.lifeScriptLabel,
      screeningDefaults.lifeScriptLabel
    ),
    lifeScriptSentence: resolveLabel(
      raw.lifeScriptSentence,
      screeningDefaults.lifeScriptSentence
    ),
    oldScriptSummary: resolveLabel(
      raw.oldScriptSummary,
      screeningDefaults.oldScriptSummary
    ),
    oldScriptSentence: resolveLabel(
      raw.oldScriptSentence,
      screeningDefaults.oldScriptSentence
    ),
    newScriptSummary: resolveLabel(
      raw.newScriptSummary,
      screeningDefaults.newScriptSummary
    ),
    newScriptSentence: resolveLabel(
      raw.newScriptSentence,
      screeningDefaults.newScriptSentence
    ),
    reflectionATitle: resolveLabel(
      raw.reflectionATitle,
      screeningDefaults.reflectionATitle
    ),
    reflectionAValue: resolveLabel(
      raw.reflectionAValue,
      screeningDefaults.reflectionAValue
    ),
    reflectionBTitle: resolveLabel(
      raw.reflectionBTitle,
      screeningDefaults.reflectionBTitle
    ),
    reflectionBValue: resolveLabel(
      raw.reflectionBValue,
      screeningDefaults.reflectionBValue
    ),
    // Array/object fields (not strings → read raw, default to []).
    exercises: Array.isArray(raw.exercises) ? raw.exercises : [],
    mantras: Array.isArray(raw.mantras) ? raw.mantras : [],
    anchors: Array.isArray(raw.anchors) ? raw.anchors : [],
    bodyStructures: Array.isArray(raw.bodyStructures) ? raw.bodyStructures : [],
    symptoms: Array.isArray(raw.symptoms) ? raw.symptoms : [],
  };
}

function selectionSnapshot() {
  const s = getScreeningSelection();
  return JSON.stringify([
    s.mindsetLabel,
    s.mindsetPhrase,
    s.mindsetSentence,
    s.triggerLabel,
    s.causeLabel,
    s.bodyStructureLabel,
    s.symptomSummary,
    s.intentionLabel,
    s.lifeScriptLabel,
    s.lifeScriptSentence,
    s.oldScriptSummary,
    s.oldScriptSentence,
    s.newScriptSummary,
    s.newScriptSentence,
    s.reflectionATitle,
    s.reflectionAValue,
    s.reflectionBTitle,
    s.reflectionBValue,
  ]);
}

export function patchScreeningSelection(partial) {
  const prev = readStored();
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...prev, ...partial })
  );
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

// Clear the in-progress selection (call after a run is finalized/persisted).
export function resetScreeningSelection() {
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

// Map the (singular-label) selection into the ProtocolSession payload shape.
export function buildProtocolPayload(runId) {
  const s = getScreeningSelection();
  const arr = (v, fallback) => (v && v !== fallback ? [v] : []);
  // Body/symptom may arrive as a real array (new) or a comma-joined string
  // (legacy/in-flight) — normalize both to a string array.
  const splitJoined = (v, fallback) =>
    v && v !== fallback
      ? v
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      : [];
  return {
    runId,
    mindsetLabel: s.mindsetLabel,
    mindsetCategory: s.mindsetCategory,
    mindsetPhrase: s.mindsetPhrase,
    mindsetSentence: s.mindsetSentence,
    triggers: arr(s.triggerLabel, screeningDefaults.triggerLabel),
    causes: arr(s.causeLabel, screeningDefaults.causeLabel),
    bodyStructures: s.bodyStructures.length
      ? s.bodyStructures
      : splitJoined(s.bodyStructureLabel, screeningDefaults.bodyStructureLabel),
    symptoms: s.symptoms.length
      ? s.symptoms
      : splitJoined(s.symptomSummary, screeningDefaults.symptomSummary),
    intentions: arr(s.intentionLabel, screeningDefaults.intentionLabel),
    exercises: s.exercises,
    mantras: s.mantras,
    anchors: s.anchors,
    lifeScriptLabel: s.lifeScriptLabel,
    lifeScriptSentence: s.lifeScriptSentence,
    oldScriptSummary: s.oldScriptSummary,
    oldScriptSentence: s.oldScriptSentence,
    newScriptSummary: s.newScriptSummary,
    newScriptSentence: s.newScriptSentence,
    reflections:
      s.reflectionATitle || s.reflectionAValue || s.reflectionBValue
        ? [
            {
              aTitle: s.reflectionATitle,
              aValue: s.reflectionAValue,
              bTitle: s.reflectionBTitle,
              bValue: s.reflectionBValue,
            },
          ]
        : [],
    reward: s.selectedReward,
    successRating: s.successRating || null,
  };
}

function subscribe(onChange) {
  const handler = () => onChange();
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function useScreeningSelection() {
  const snapshot = useSyncExternalStore(
    subscribe,
    selectionSnapshot,
    selectionSnapshot
  );
  const [
    mindsetLabel,
    mindsetPhrase,
    mindsetSentence,
    triggerLabel,
    causeLabel,
    bodyStructureLabel,
    symptomSummary,
    intentionLabel,
    lifeScriptLabel,
    lifeScriptSentence,
    oldScriptSummary,
    oldScriptSentence,
    newScriptSummary,
    newScriptSentence,
    reflectionATitle,
    reflectionAValue,
    reflectionBTitle,
    reflectionBValue,
  ] = JSON.parse(snapshot);
  return {
    mindsetLabel,
    mindsetPhrase,
    mindsetSentence,
    triggerLabel,
    causeLabel,
    bodyStructureLabel,
    symptomSummary,
    intentionLabel,
    lifeScriptLabel,
    lifeScriptSentence,
    oldScriptSummary,
    oldScriptSentence,
    newScriptSummary,
    newScriptSentence,
    reflectionATitle,
    reflectionAValue,
    reflectionBTitle,
    reflectionBValue,
  };
}

export function splitMindsetSentence(sentence) {
  return sentence.split(/(\[mindset\]|\[trigger\])/g);
}
