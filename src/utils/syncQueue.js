export function addToQueue(action) {
  const queue = JSON.parse(localStorage.getItem("syncQueue") || "[]");
  queue.push({ ...action, time: Date.now() });
  localStorage.setItem("syncQueue", JSON.stringify(queue));
}

export async function processQueue() {
  const queue = JSON.parse(localStorage.getItem("syncQueue") || "[]");
  const remaining = [];

  for (const job of queue) {
    try {
      await fetch(job.url, job.options);
    } catch {
      remaining.push(job);
    }
  }

  localStorage.setItem("syncQueue", JSON.stringify(remaining));
}