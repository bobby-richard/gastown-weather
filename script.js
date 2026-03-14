const views = {
  now: {
    temp: "58°",
    detail: "Dense fog lifting by 09:40",
    visibility: "0.8 nm",
    visibilityMeta: "Fog bank offshore",
    wind: "14 kt",
    windMeta: "NE with harbor gusts",
    craft: "Caution",
    craftMeta: "Signal orange through noon",
    forecast: [
      ["06:00", "58°", "Fog / low surf"],
      ["09:00", "61°", "Blue opening"],
      ["12:00", "64°", "Bright and clear"],
      ["15:00", "63°", "Sea breeze returns"],
    ],
  },
  late: {
    temp: "61°",
    detail: "Crosswind pulse after sunset",
    visibility: "4.2 nm",
    visibilityMeta: "Clear channel markers",
    wind: "22 kt",
    windMeta: "ESE building in bursts",
    craft: "Advisory",
    craftMeta: "Red band from 18:00 to 23:00",
    forecast: [
      ["18:00", "61°", "Orange gust front"],
      ["20:00", "58°", "Spray on decks"],
      ["22:00", "55°", "Peak crosswind"],
      ["00:00", "53°", "Settling tide"],
    ],
  },
  tomorrow: {
    temp: "56°",
    detail: "Frontal edge before daybreak",
    visibility: "2.6 nm",
    visibilityMeta: "Rain haze in the channel",
    wind: "18 kt",
    windMeta: "SW with cooler air",
    craft: "Monitor",
    craftMeta: "Signal softens by midday",
    forecast: [
      ["05:00", "52°", "Rain line arrives"],
      ["08:00", "54°", "Teal squall breaks"],
      ["11:00", "57°", "Showers thinning"],
      ["14:00", "59°", "Brighter western edge"],
    ],
  },
};

const ids = {
  temp: document.getElementById("current-temp"),
  detail: document.getElementById("current-detail"),
  visibility: document.getElementById("visibility"),
  visibilityMeta: document.getElementById("visibility-meta"),
  wind: document.getElementById("wind"),
  windMeta: document.getElementById("wind-meta"),
  craft: document.getElementById("craft"),
  craftMeta: document.getElementById("craft-meta"),
  strip: document.getElementById("forecast-strip"),
};

function renderForecast(items) {
  ids.strip.innerHTML = "";
  items.forEach(([time, temp, note], index) => {
    const pill = document.createElement("article");
    pill.className = "forecast-pill";
    pill.style.animationDelay = `${index * 80}ms`;
    pill.innerHTML = `<strong>${time}</strong><div>${temp}</div><span>${note}</span>`;
    ids.strip.appendChild(pill);
  });
}

function renderView(key) {
  const view = views[key];
  ids.temp.textContent = view.temp;
  ids.detail.textContent = view.detail;
  ids.visibility.textContent = view.visibility;
  ids.visibilityMeta.textContent = view.visibilityMeta;
  ids.wind.textContent = view.wind;
  ids.windMeta.textContent = view.windMeta;
  ids.craft.textContent = view.craft;
  ids.craftMeta.textContent = view.craftMeta;
  renderForecast(view.forecast);

  document.querySelectorAll(".chip").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.range === key);
    button.setAttribute("aria-pressed", String(button.dataset.range === key));
  });
}

document.querySelectorAll(".chip").forEach((button) => {
  button.addEventListener("click", () => renderView(button.dataset.range));
});

renderView("now");
