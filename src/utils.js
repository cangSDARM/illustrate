export const jump = (href) => {
  if (globalThis.location.pathname.startsWith(href)) return;

  globalThis.history.pushState({}, "", globalThis.location.pathname);
  globalThis.history.replaceState({}, "", href);
};
