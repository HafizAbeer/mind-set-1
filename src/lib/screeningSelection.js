import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mindsetScreeningSelection";
const CHANGE_EVENT = "mindset-screening-selection-change";

export const screeningDefaults = {
  mindsetLabel: "mindset",
  triggerLabel: "trigger",
  causeLabel: "cause",
  bodyStructureLabel: "body structure",
  symptomSummary: "symptom",
  intentionLabel: "Intention",
  lifeScriptLabel: "life script",
  oldScriptSummary: "old script/s",
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
    oldScriptSummary: resolveLabel(
      raw.oldScriptSummary,
      screeningDefaults.oldScriptSummary
    ),
  };
}

function selectionSnapshot() {
  const s = getScreeningSelection();
  return JSON.stringify([
    s.mindsetLabel,
    s.triggerLabel,
    s.causeLabel,
    s.bodyStructureLabel,
    s.symptomSummary,
    s.intentionLabel,
    s.lifeScriptLabel,
    s.oldScriptSummary,
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
    triggerLabel,
    causeLabel,
    bodyStructureLabel,
    symptomSummary,
    intentionLabel,
    lifeScriptLabel,
    oldScriptSummary,
  ] = JSON.parse(snapshot);
  return {
    mindsetLabel,
    triggerLabel,
    causeLabel,
    bodyStructureLabel,
    symptomSummary,
    intentionLabel,
    lifeScriptLabel,
    oldScriptSummary,
  };
}
