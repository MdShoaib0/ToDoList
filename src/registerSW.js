export function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(reg => {
      if ("sync" in reg) {
        reg.sync.register("sync-data");
      }
    });
  }
}