import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

// Settings mutations. Components update AuthContext (setUser/refresh) on success
// so the sidebars and gating stay in sync.
export function useUpdateProfile() {
  return useMutation({
    mutationFn: (body) =>
      apiFetch("/user/me/profile", { method: "PATCH", body }),
  });
}

export function useUpdatePreferences() {
  return useMutation({
    mutationFn: (body) =>
      apiFetch("/user/me/preferences", { method: "PATCH", body }),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (body) => apiFetch("/user/me/password", { method: "POST", body }),
  });
}

export function useRequestEmailChange() {
  return useMutation({
    mutationFn: (newEmail) =>
      apiFetch("/user/me/email/request", { method: "POST", body: { newEmail } }),
  });
}

export function useConfirmEmailChange() {
  return useMutation({
    mutationFn: (code) =>
      apiFetch("/user/me/email/confirm", { method: "POST", body: { code } }),
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: (body) => apiFetch("/user/me", { method: "DELETE", body }),
  });
}

export function useInviteTherapist() {
  return useMutation({
    mutationFn: (emails) =>
      apiFetch("/user/me/invite-therapist", { method: "POST", body: { emails } }),
  });
}
