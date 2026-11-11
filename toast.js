// Toast helper: show small notification banner at top of page.
export function toast(msg, kind = "info") {
  let host = document.getElementById("cpv-toast-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "cpv-toast-host";
    Object.assign(host.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      pointerEvents: "none",
    });
    document.body.appendChild(host);
  }
  const el = document.createElement("div");
  el.textContent = msg;
  const palette = {
    info: "rgba(0, 234, 255, 0.18)",
    success: "rgba(25, 245, 168, 0.20)",
    error: "rgba(255, 93, 108, 0.22)",
  };
  Object.assign(el.style, {
    padding: "10px 14px",
    borderRadius: "10px",
    background: "rgba(10, 14, 22, 0.95)",
    color: "#e8edf5",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "13px",
    border: `1px solid ${palette[kind] || palette.info}`,
    boxShadow: "0 0 24px rgba(0, 234, 255, 0.25)",
    pointerEvents: "auto",
    maxWidth: "min(420px, 92vw)",
    textAlign: "center",
  });
  host.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .25s, transform .25s";
    el.style.opacity = "0";
    el.style.transform = "translateY(-8px)";
    setTimeout(() => el.remove(), 280);
  }, 2400);
}

window.toast = toast;
