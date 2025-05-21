const apiUrl = "http://localhost:8080/api/users";

function getInputValues() {
  return {
    id: document.getElementById("userId").value.trim(),
    name: document.getElementById("userName").value.trim(),
    email: document.getElementById("userEmail").value.trim(),
  };
}

async function loadUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();

  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <strong>ID:</strong> ${user.id}<br>
      <strong>Name:</strong> ${user.name}<br>
      <strong>Email:</strong> ${user.email}
    `;
    userList.appendChild(card);
  });
}

async function addUser() {
  const { name, email } = getInputValues();
  if (!name || !email) return alert("Name and Email are required!");

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  loadUsers();
}

async function updateUser() {
  const { id, name, email } = getInputValues();
  if (!id || !name || !email) return alert("ID, Name and Email are required!");

  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  loadUsers();
}

async function deleteUser() {
  const { id } = getInputValues();
  if (!id) return alert("User ID is required!");

  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  });

  loadUsers();
}

async function getUser() {
  const { id } = getInputValues();
  if (!id) return alert("User ID is required!");

  const response = await fetch(`${apiUrl}/${id}`);
  const user = await response.json();

  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  const card = document.createElement("div");
  card.className = "user-card";
  card.innerHTML = `
    <strong>ID:</strong> ${user.id}<br>
    <strong>Name:</strong> ${user.name}<br>
    <strong>Email:</strong> ${user.email}
  `;
  userList.appendChild(card);
}
