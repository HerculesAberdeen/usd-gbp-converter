export default async function handler(req, res) {
  const direction = req.query.direction || "usd-to-gbp";
  let url = "";

  if (direction === "usd-to-gbp") {
    url = "https://api.exchangerate.host/convert?from=USD&to=GBP";
  } else if (direction === "gbp-to-usd") {
    url = "https://api.exchangerate.host/convert?from=GBP&to=USD";
  } else {
    return res.status(400).json({ error: "Invalid direction." });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || typeof data.result !== "number") {
      return res.status(500).json({ error: "Invalid response from API" });
    }

    res.status(200).json({ rate: data.result });
  } catch (err) {
    res.status(500).json({ error: "Conversion failed" });
  }
}
