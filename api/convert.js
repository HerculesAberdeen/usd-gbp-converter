document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("converter-form");
  const resultElement = document.getElementById("result");
  const forecastResult = document.getElementById("forecast-result");
  const percentInput = document.getElementById("percent-change");
  const percentLabel = document.getElementById("percent-label");
  const directionSelect = document.getElementById("direction");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("usd").value);
    const direction = directionSelect.value;

    if (isNaN(amount)) {
      resultElement.textContent = "Please enter a valid number.";
      return;
    }

    try {
      const response = await fetch("/api/convert?direction=" + direction);
      const data = await response.json();

      if (!data || typeof data.rate !== "number") {
        resultElement.textContent = "Conversion failed. Try again.";
        return;
      }

      const rate = data.rate;
      const converted = direction === "usd-to-gbp" 
        ? amount * rate 
        : amount / rate;

      resultElement.textContent = `Converted amount: ${converted.toFixed(2)}`;

      // Forecast
      const percent = parseFloat(percentInput.value);
      const multiplier = 1 + percent / 100;
      const forecasted = converted * multiplier;
      forecastResult.textContent = `Forecasted (with ${percent}% change): ${forecasted.toFixed(2)}`;
    } catch (err) {
      resultElement.textContent = "Error: Unable to fetch rate.";
    }
  });

  percentInput.addEventListener("input", () => {
    percentLabel.textContent = `${percentInput.value}%`;
  });
});
