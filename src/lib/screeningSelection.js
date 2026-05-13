import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mindsetScreeningSelection";
const CHANGE_EVENT = "mindset-screening-selection-change";

export const screeningDefaults = {
  mindsetLabel: "mindset",
  mindsetPhrase: "mindset",
  mindsetSentence: "I feel [mindset] by [trigger]",
  triggerLabel: "trigger",
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
  };
}

export function splitMindsetSentence(sentence) {
  return sentence.split(/(\[mindset\]|\[trigger\])/g);
}
