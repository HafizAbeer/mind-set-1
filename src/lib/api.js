// The app's single authenticated HTTP client. Until now the JWT was stored at
// login but never sent on any request — every authed endpoint depends on this.
//
// Convention: 401 is reserved for AUTHENTICATION failures (missing/expired/
// invalid token). Application errors like "wrong current password" use 400, so
// a 401 can safely trigger a global sign-out (see AuthContext).

const TOKEN_KEY = "userToken";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export async function apiFetch(
  path,
  { method = "GET", body, signal, headers = {} } = {},
) {
  const token = getToken();
  const res = await fetch(`/api${path}`, {
    method,
    signal,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Parse defensively: some responses (204, HTML error pages) aren't JSON.
  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    if (res.status === 401) {
      // Token missing/expired/invalid — ask the app to sign out (handled
      // softly in AuthContext, which skips redirecting on auth routes).
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    throw new ApiError(
      res.status,
      (data && data.message) || `Request failed (${res.status})`,
    );
  }

  return data;
}
