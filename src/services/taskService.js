const URL = "https://to-do-list-backend-rho.vercel.app/task/";

export async function fetchTasks() {
  const res = await fetch(URL);
  return res.json();
}

export async function addTask(task) {
  return fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

export async function updateTask(id, task) {
  return fetch(`${URL}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id) {
  return fetch(`${URL}${id}`, { method: "DELETE" });
}