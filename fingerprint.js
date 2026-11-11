// SHA-256 device fingerprint helper used on the activate page.
// Tries crypto.subtle first; falls back to a localStorage-bound random id.

const FINGERPRINT_KEY = "cpv_fingerprint_v1";

export async function getDeviceFingerprint() {
  try {
    const stored = localStorage.getItem(FINGERPRINT_KEY);
    if (stored) return stored;
    const fp = await computeFingerprint();
    localStorage.setItem(FINGERPRINT_KEY, fp);
    return fp;
  } catch (e) {
    return `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

async function computeFingerprint() {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("crypto-unavailable");
  }
  const parts = collect();
  const enc = new TextEncoder().encode(parts.join("|"));
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function collect() {
  const nav = navigator || {};
  const scr = window.screen || {};
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  return [
    nav.userAgent || "",
    nav.platform || "",
    nav.vendor || "",
    nav.language || "",
    (nav.languages || []).join(","),
    String(nav.hardwareConcurrency || ""),
    String(nav.deviceMemory || ""),
    String(nav.maxTouchPoints || ""),
    String(scr.width || ""),
    String(scr.height || ""),
    String(scr.colorDepth || ""),
    String(window.devicePixelRatio || ""),
    tz,
  ];
}

window.getDeviceFingerprint = getDeviceFingerprint;
