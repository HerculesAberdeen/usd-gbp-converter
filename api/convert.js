export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.exchangerate.host/convert?from=USD&to=GBP");
    const data = await response.json();

    if (!data || typeof data.result !== "number") {
      return res.status(500).json({ error: "Invalid response from API" });
    }

    res.status(200).json({ rate: data.result });
  } catch (err) {
    res.status(500).json({ error: "Conversion failed" });
  }
}
