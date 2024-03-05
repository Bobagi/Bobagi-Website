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

      const currentValue = parseFloat(usd);
      let convertedThreshold;

      convertedThreshold = parseFloat(threshold);

      if (usingUsd == false) {
        const brlValue = parseFloat(brl);
        convertedThreshold = (convertedThreshold * currentValue) / brlValue;
      }

      if (convertedThreshold >= currentValue) {
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
      INSERT INTO cripto_currency (symbol, cryptoId)
      VALUES ($1, $2)
      ON CONFLICT (symbol)
      DO NOTHING
    `;
    await global.dbPool.query(insertQuery, [symbol, id]);

    insertQuery = `
      INSERT INTO cripto_threshold (id_email, id_cripto, threshold, greaterThanCurrent, created_at)
      VALUES (
        (SELECT id FROM cripto_email WHERE email = $1),
        (SELECT id FROM cripto_currency WHERE symbol = $2),        
        $3,
        $4,
        NOW()
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

router.post("/clearAlerts", async (req, res) => {
  try {
    const deleteQuery = `
      DELETE FROM cripto_threshold 
      WHERE created_at IS NULL OR 
            created_at < (NOW() - INTERVAL '1 WEEK')    
    `;
    await global.dbPool.query(deleteQuery);

    const deleteRepetedEmailThresholdsQuery = `
      WITH repetedthresholds AS(
        SELECT DISTINCT cripto_threshold.* FROM cripto_threshold
        INNER JOIN cripto_threshold AS repeated 
        ON cripto_threshold.id_cripto = repeated.id_cripto
        AND cripto_threshold.id_email = repeated.id_email
        AND cripto_threshold.greaterthancurrent = repeated.greaterthancurrent
      )
      DELETE FROM cripto_threshold WHERE id IN (SELECT id FROM repetedthresholds WHERE created_at < (SELECT MAX(created_at) FROM repetedthresholds))         
    `;
    await global.dbPool.query(deleteRepetedEmailThresholdsQuery);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during clearAlerts: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/clearAlertById", async (req, res) => {
  try {
    const { id } = req.body;

    const deleteQuery = `
      DELETE FROM cripto_threshold 
      WHERE id = $1;
    `;
    await global.dbPool.query(deleteQuery, [id]);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during clearAlert by id: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getCryptos", async (req, res) => {
  try {
    const query = `SELECT id, cryptoId FROM cripto_currency;`;
    const cryptos = await global.dbPool.query(query);
    const formattedCryptos = cryptos.rows.map((row) => ({
      id: row.id,
      cryptoid: row.cryptoid,
    }));
    res.status(200).json(formattedCryptos);
    // Response example:
    // [
    //   {"id": 1, "cryptoId": "btc"},
    //   {"id": 2, "cryptoId": "eth"},
    //   {"id": 3, "cryptoId": "usdt"},
    //   {"id": 4, "cryptoId": "xrp"}
    // ]
  } catch (error) {
    console.error("Error fetching cryptocurrencies: ", error);
    res.status(500).json({
      message: "Internal server error fetching cryptocurrencies.",
    });
  }
});

router.get("/reachedThresholds", async (req, res) => {
  const { id, cryptoValue } = req.query;
  try {
    const query = `
      SELECT cripto_threshold.id, cripto_threshold.threshold, cripto_threshold.greaterthancurrent, cripto_email.email 
      FROM cripto_threshold 
      INNER JOIN cripto_currency ON cripto_currency.id = cripto_threshold.id_cripto
      INNER JOIN cripto_email ON cripto_email.id = cripto_threshold.id_email
      WHERE cripto_threshold.id_cripto = $1
      AND CASE WHEN cripto_threshold.greaterthancurrent = true 
      THEN cripto_threshold.threshold <= $2
      ELSE cripto_threshold.threshold >= $2
      END
    `;
    const storage = await global.dbPool.query(query, [id, cryptoValue]);
    res.status(200).json(storage.rows);
  } catch (error) {
    console.error("Database Goldrush 'loadStorage' error: ", error);
    res.status(500).json({
      message: "Internal server error Goldrush loadStorage " + this + ". ",
    });
  }
});

module.exports = router;
