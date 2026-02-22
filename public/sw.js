self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("sync", async (event) => {
  if (event.tag === "sync-data") {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({ type: "SYNC_NOW" });
    });
  }
});