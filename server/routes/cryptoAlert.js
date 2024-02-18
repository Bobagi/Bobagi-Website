const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/test", async (req, res) => {
  res.status(200).json({ message: "Recovery crypto alert routes sent" });
});

router.post("/registerAlert", async (req, res) => {
  try {
    const { email, symbolAndId, threshold, usingUsd } = req.body;

    const symbol = symbolAndId.split(" - ")[0];
    const id = symbolAndId.split(" - ")[1];

    console.log("Next add: ", symbol, " - ", id);
    let greaterThanCurrent = true;

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd,brl`
      );

      const usd = response.data[id].usd.toFixed(2);
      const brl = response.data[id].brl.toFixed(2).replace(",", ".");

      // const usd = "51735.00";
      // const brl = "256973,00".replace(",", ".");

      let currentValue;

      if (usingUsd == true) {
        currentValue = usd;
      } else {
        currentValue = brl;
      }

      if (parseFloat(threshold) >= parseFloat(currentValue)) {
        greaterThanCurrent = true;
      } else {
        greaterThanCurrent = false;
      }
    } catch (error) {
      return res.status(503).json({ error: "CoinGecko Service Unavailable" });
      // throw error;
    }

    let insertQuery = `
      INSERT INTO cripto_email (email)
      VALUES ($1)
      ON CONFLICT (email)
      DO NOTHING
    `;
    await global.dbPool.query(insertQuery, [email]);

    insertQuery = `
      INSERT INTO cripto_currency (symbol)
      VALUES ($1)
      ON CONFLICT (symbol)
      DO NOTHING
    `;
    await global.dbPool.query(insertQuery, [symbol]);

    insertQuery = `
      INSERT INTO cripto_threshold (id_email, id_cripto, threshold, greaterThanCurrent)
      VALUES (
        (SELECT id FROM cripto_email WHERE email = $1),
        (SELECT id FROM cripto_currency WHERE symbol = $2),        
        $3,
        $4
      )
    `;
    await global.dbPool.query(insertQuery, [
      email,
      symbol,
      threshold,
      greaterThanCurrent,
    ]);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during registerAlert: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
