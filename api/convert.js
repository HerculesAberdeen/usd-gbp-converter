export default async function handler(req, res) {
  try {
    const response = await fetch("https://v6.exchangerate-api.com/v6/020e367bd9af9e9325e55dea/latest/USD");
    const data = await response.json();

    if (!data || typeof data.conversion_rates?.GBP !== "number") {
      return res.status(500).json({ error: "Invalid API response." });
    }

    res.status(200).json({ rate: data.conversion_rates.GBP });
  } catch (err) {
    res.status(500).json({ error: "Conversion failed. Try again." });
  }
}

