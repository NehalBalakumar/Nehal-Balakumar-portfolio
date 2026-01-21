/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* ================= NAV ACTIVE ================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ================= STATS COUNT ================= */
const statNumbers = document.querySelectorAll(".stat-box h3");

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.done) {
      const el = entry.target;
      const finalValue = parseInt(el.innerText);
      let count = 0;

      const interval = setInterval(() => {
        count++;
        el.innerText = el.innerText.includes("+") ? `${count}+` : count;
        if (count >= finalValue) {
          el.innerText = el.innerText.includes("+")
            ? `${finalValue}+`
            : finalValue;
          clearInterval(interval);
        }
      }, 20);

      el.dataset.done = "true";
    }
  });
}, { threshold: 0.6 });

statNumbers.forEach(stat => statsObserver.observe(stat));

/* ================= SCROLL REVEAL ================= */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ================= THEME TOGGLE (FINAL & FIXED) ================= */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// system preference
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || (!savedTheme && prefersLight)) {
  body.classList.add("light");
  themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
} else {
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");

  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
});

/* ================= MAGNETIC HOVER (SAFE) ================= */
document.querySelectorAll(
  ".skill-card, .contact-card, .stat-box, .edu-img, .ach-img"
).forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform =
      `translate(${x * 0.04}px, ${y * 0.04}px) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translate(0,0) scale(1)";
  });
});

/* ================= SCROLL PROGRESS ================= */
const progressBar = document.getElementById("scroll-progress");

if (progressBar) {
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled =
      (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

/* ================= DSA MONTHLY STOCK GRAPH ================= */

let dsaChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("dsaChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (dsaChartInstance) {
    dsaChartInstance.destroy();
  }

  const monthlyData = [
    { month: "Jan 2025", value: 6 },
    { month: "Feb", value: 9 },
    { month: "Mar", value: 14 },
    { month: "Apr", value: 7 },
    { month: "May", value: 11 },
    { month: "Jun", value: 18 },
    { month: "Jul", value: 32 },
    { month: "Aug", value: 28 },
    { month: "Sep", value: 41 },
    { month: "Oct", value: 38 },
    { month: "Nov", value: 45 },
    { month: "Dec", value: 22 },
    { month: "Jan 2026", value: 19 }
  ];

  const values = monthlyData.map(d => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const pointColors = values.map(v =>
    v === max ? "#22c55e" : v === min ? "#ef4444" : "#facc15"
  );

  const glowColors = values.map(v =>
    v === max
      ? "rgba(34,197,94,.45)"
      : v === min
      ? "rgba(239,68,68,.45)"
      : "rgba(250,204,21,.45)"
  );

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(56,189,248,.35)");
  gradient.addColorStop(1, "rgba(2,6,23,0)");

  dsaChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: monthlyData.map(d => d.month),
      datasets: [{
        data: values,
        borderColor: "#38bdf8",
        backgroundColor: gradient,
        fill: true,
        tension: 0.45,
        pointRadius: 6,
        pointHoverRadius: 14,
        pointBackgroundColor: pointColors,
        pointBorderColor: "#020617",
        pointHoverBackgroundColor: glowColors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(2,6,23,.95)",
          titleColor: "#fff",
          bodyColor: "#e5e7eb",
          padding: 14,
          displayColors: false,
          callbacks: {
            label: ctx => ` Problems solved: ${ctx.parsed.y}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#94a3b8" }
        },
        y: {
          grid: { color: "rgba(255,255,255,.06)" },
          ticks: { color: "#94a3b8" }
        }
      }
    }
  });
});

/* ================= DSA DAILY HEATMAP ================= */

document.addEventListener("DOMContentLoaded", () => {
  const heatmap = document.getElementById("heatmap");
  if (!heatmap) return;

  // Generate 365 days
  for (let i = 0; i < 365; i++) {
    const cell = document.createElement("div");
    cell.classList.add("heatmap-cell");

    // Fake daily problems (replace later with real data)
    const solved = Math.floor(Math.random() * 6); // 0–5

    if (solved <= 1) cell.classList.add("heat-low");
    else if (solved <= 3) cell.classList.add("heat-mid");
    else cell.classList.add("heat-high");

    const date = new Date();
    date.setDate(date.getDate() - (364 - i));

    cell.dataset.info = `${date.toDateString()} • ${solved} problems`;

    heatmap.appendChild(cell);
  }
});
