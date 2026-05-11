async function addExpense() {
  const title = document.getElementById("title").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value.trim();

  if (!title || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid title and amount.");
    return;
  }

  await fetch(`${API}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount, category, note }),
  });

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("note").value = "";

  await loadExpenses();
  await loadChart();
}

async function deleteExpense(id) {
  await fetch(`${API}/expenses/${id}`, { method: "DELETE" });
  await loadExpenses();
  await loadChart();
}

async function loadExpenses() {
  const res = await fetch(`${API}/expenses`);
  const expenses = await res.json();
  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  if (expenses.length === 0) {
    list.innerHTML = `<li style="color:#718096;font-size:0.9rem;">No expenses yet. Add your first one!</li>`;
    return;
  }

  expenses.forEach((e) => {
    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
      <div class="info">
        <span class="title">${e.title}</span>
        <span class="meta">${new Date(e.date).toLocaleDateString()} ${e.note ? "· " + e.note : ""}</span>
      </div>
      <div class="right">
        <span class="badge">${e.category}</span>
        <span class="amount">₹${e.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="deleteExpense('${e._id}')" title="Delete">✕</button>
      </div>
    `;
    list.appendChild(li);
  });
}
