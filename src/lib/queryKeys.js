// Centralized React Query key factory so mutations can invalidate precisely.
export const queryKeys = {
  me: () => ["me"],
  subscription: () => ["subscription"],
  preferences: () => ["preferences"],
  statistics: (kind, params) => ["statistics", kind, params ?? {}],
  diary: (page) => ["diary", page],
  reflection: (page) => ["reflection", page],
  protocol: (page) => ["protocol", page],
};
