async function fetchInsights() {
  const box = document.getElementById("insight-box");
  const btn = document.getElementById("insights-btn");

  box.classList.remove("hidden");
  box.classList.add("loading");
  box.textContent = "✨ Analyzing your expenses...";
  btn.disabled = true;

  try {
    const res = await fetch(`${API}/ai/insights`);
    const data = await res.json();
    box.classList.remove("loading");
    box.textContent = data.insight || data.error;
  } catch (err) {
    box.classList.remove("loading");
    box.textContent = "Failed to load insights. Please try again.";
  } finally {
    btn.disabled = false;
  }
}
