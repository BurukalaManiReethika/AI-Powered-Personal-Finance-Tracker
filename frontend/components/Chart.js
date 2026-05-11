let spendingChart = null;

async function loadChart() {
  const res = await fetch(`${API}/expenses/summary`);
  const summary = await res.json();

  const labels = summary.map((s) => s._id);
  const data = summary.map((s) => s.total);
  const colors = ["#667eea", "#f6ad55", "#68d391", "#fc8181", "#76e4f7", "#b794f4", "#fbb6ce"];

  const ctx = document.getElementById("spendingChart").getContext("2d");

  if (spendingChart) spendingChart.destroy();

  spendingChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ₹${ctx.parsed.toFixed(2)}`,
          },
        },
      },
    },
  });
}
