const express = require("express");
const axios = require("axios");
const router = express.Router();
const { executeQuery } = require("../src/database.js");

router.get("/test", async (req, res) => {
  res.status(200).json({ message: "Recovery crypto alert routes sent" });
});

router.post("/registerAlert", async (req, res) => {
  try {
    const { email, symbolAndId, threshold, usingUsd } = req.body;

    const symbol = symbolAndId.split(" - ")[0];
    const id = symbolAndId.split(" - ")[1];

    let greater_than_current = true;
    let convertedThreshold = 0;

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd,brl`
      );

      const usd = response.data[id].usd.toFixed(2);
      const brl = response.data[id].brl.toFixed(2).replace(",", ".");

      const currentValue = parseFloat(usd);
      convertedThreshold = parseFloat(threshold);

      if (!usingUsd) {
        console.log("Brl value for " + id + ": ", convertedThreshold);
        const brlValue = parseFloat(brl);
        convertedThreshold = parseFloat(
          (convertedThreshold * currentValue) / brlValue
        );
        console.log("Converted to usd value: ", convertedThreshold);
      }

      if (convertedThreshold >= currentValue) {
        greater_than_current = true;
      } else {
        greater_than_current = false;
      }
    } catch (error) {
      return res.status(503).json({ error: "CoinGecko Service Unavailable" });
      // throw error;
    }

    let insertQuery = `
      INSERT INTO crypto_email (email)
      VALUES ($1)
      ON CONFLICT (email)
      DO NOTHING
    `;
    await executeQuery(insertQuery, [email]);

    insertQuery = `
      INSERT INTO crypto_currency (symbol, crypto_id)
      VALUES ($1, $2)
      ON CONFLICT (symbol)
      DO NOTHING
    `;
    await executeQuery(insertQuery, [symbol, id]);

    insertQuery = `
      INSERT INTO crypto_threshold (email_id, crypto_id, threshold, is_greater_than_current, created_at)
      VALUES (
        (SELECT id FROM crypto_email WHERE email = $1),
        (SELECT id FROM crypto_currency WHERE symbol = $2),        
        $3,
        $4,
        NOW()
      )
    `;
    await executeQuery(insertQuery, [
      email,
      symbol,
      convertedThreshold,
      greater_than_current,
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
      DELETE FROM crypto_threshold 
      WHERE created_at IS NULL OR 
            created_at < (NOW() - INTERVAL '1 WEEK')    
    `;
    await executeQuery(deleteQuery);

    const deleteRepetedEmailThresholdsQuery = `
      WITH repeted_thresholds AS(
        SELECT DISTINCT crypto_threshold.* FROM crypto_threshold
        INNER JOIN crypto_threshold AS repeated 
        ON crypto_threshold.crypto_id = repeated.crypto_id
        AND crypto_threshold.email_id = repeated.email_id
        AND crypto_threshold.is_greater_than_current = repeated.is_greater_than_current
      )
      DELETE FROM crypto_threshold WHERE id IN (SELECT id FROM repeted_thresholds WHERE created_at < (SELECT MAX(created_at) FROM repeted_thresholds))         
    `;
    await executeQuery(deleteRepetedEmailThresholdsQuery);

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
      DELETE FROM crypto_threshold 
      WHERE id = $1;
    `;
    await executeQuery(deleteQuery, [id]);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during clearAlert by id: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getCryptos", async (req, res) => {
  try {
    const query = `SELECT id, crypto_id FROM crypto_currency;`;
    const cryptos = await executeQuery(query);
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
      message: "Internal server error fetching crypto currencies.",
    });
  }
});

router.get("/reachedThresholds", async (req, res) => {
  const { id, cryptoValue } = req.query;
  try {
    const query = `
      SELECT crypto_threshold.id, crypto_threshold.threshold, crypto_threshold.is_greater_than_current, crypto_email.email 
      FROM crypto_threshold 
      INNER JOIN crypto_currency ON crypto_currency.id = crypto_threshold.crypto_id
      INNER JOIN crypto_email ON crypto_email.id = crypto_threshold.email_id
      WHERE crypto_threshold.crypto_id = $1
      AND CASE WHEN crypto_threshold.is_greater_than_current = true 
      THEN crypto_threshold.threshold <= $2
      ELSE crypto_threshold.threshold >= $2
      END
    `;
    const storage = await executeQuery(query, [id, cryptoValue]);
    res.status(200).json(storage.rows);
  } catch (error) {
    console.error("Database Goldrush 'loadStorage' error: ", error);
    res.status(500).json({
      message: "Internal server error Goldrush loadStorage " + this + ". ",
    });
  }
});

module.exports = router;
