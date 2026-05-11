const API = "/api";

async function init() {
  await loadExpenses();
  await loadChart();
}

document.addEventListener("DOMContentLoaded", init);
