document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("converter-form");
  const resultElement = document.getElementById("result");
  const forecastElement = document.getElementById("forecast-result");
  const percentChange = document.getElementById("percent-change");
  const percentLabel = document.getElementById("percent-label");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const usd = parseFloat(document.getElementById("usd").value);
    const direction = document.getElementById("direction").value;

    if (isNaN(usd)) {
      resultElement.textContent = "Please enter a valid amount.";
      return;
    }

    try {
      const res = await fetch(`/api/convert?direction=${direction}`);
      const data = await res.json();

      if (!res.ok) {
        resultElement.textContent = `Error: ${data.error}`;
        return;
      }

      const converted = direction === "usd-to-gbp"
        ? usd * data.rate
        : usd / data.rate;

      resultElement.textContent = `Converted: ${converted.toFixed(2)} ${direction === "usd-to-gbp" ? "GBP" : "USD"}`;

      // Forecast
      const percent = parseFloat(percentChange.value);
      const adjustedRate = data.rate * (1 + percent / 100);
      const forecasted = direction === "usd-to-gbp"
        ? usd * adjustedRate
        : usd / adjustedRate;

      forecastElement.textContent = `Forecasted (${percent}%): ${forecasted.toFixed(2)} ${direction === "usd-to-gbp" ? "GBP" : "USD"}`;

    } catch (err) {
      resultElement.textContent = "Conversion failed. Try again.";
    }
  });

  // Update label and forecast dynamically when slider is moved
  percentChange.addEventListener("input", () => {
    percentLabel.textContent = `${percentChange.value}%`;
  });
});
