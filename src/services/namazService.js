const URL = "https://to-do-list-backend-rho.vercel.app/namaz/";

export async function fetchNamaz() {
  const res = await fetch(URL);
  return res.json();
}

export async function updateNamaz(data) {
  return fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}