<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <div>
            <h1><span class="primary-color">Coin</span>Alert</h1>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-form ref="form">
            <v-row justify="center">
              <v-col
                cols="auto"
                md="8"
              >
                <div>
                  <p style="text-align: left">
                    The Coin Alert Project is a Python-based initiative designed to help you stay informed about cryptocurrency values using the Coingecko API. You can choose multiple cryptocurrencies and set individual thresholds for each one. When a coin reaches your threshold, an email will be sent to the address you provided. The program will watch for 1 week, and then stop if the threshold isn't reached.
                  </p>
                  <br />
                  <a
                    href="https://www.coingecko.com/"
                    target="_blank"
                  >
                    <v-img
                      src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
                      height="100"
                      class="logo green-shadow mb-4"
                      alt="Coingecko website logo"
                    />
                  </a>

                  <v-row>
                    <v-col
                      cols="8"
                      class="pr-0"
                    >
                      <v-autocomplete
                        id="autoCompleteCrypto"
                        color="secondary"
                        label="Cryptocurrency"
                        :items="cryptoList"
                        variant="outlined"
                        :disabled="isLoading"
                        v-model="selectedCrypto"
                        :rules="selectedCryptoRules"
                        required
                        single-line
                      ></v-autocomplete>
                    </v-col>

                    <v-col
                      cols="4"
                      class="d-flex align-center justify-end"
                      style="gap: 8px;"
                    >
                      <v-btn
                        icon="mdi-refresh"
                        color="primary"
                        size="large"
                        variant="outlined"
                        @click="reloadCryptoList"
                        :disabled="isLoading"
                      >
                        <v-icon
                          :class="{ rotate: isLoading }"
                          icon="mdi-refresh"
                          size="24"
                        ></v-icon>
                      </v-btn>

                      <v-btn
                        icon="mdi-plus"
                        color="primary"
                        size="large"
                        variant="outlined"
                        @click="addCrypto"
                        :disabled="!selectedCrypto || isLoading"
                      >
                        <v-icon
                          icon="mdi-plus"
                          size="24"
                        ></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-data-table
                    :headers="tableHeaders"
                    :items="selectedCoins"
                    class="mt-4 elevation-1"
                    density="comfortable"
                    striped
                  >
                    <template v-slot:[`item.usdValue`]="{ item }">
                      {{ item.usdValue }}
                    </template>

                    <template v-slot:[`item.brlValue`]="{ item }">
                      {{ item.brlValue }}
                    </template>

                    <template v-slot:[`item.threshold`]="{ item }">
                      <v-text-field
                        v-model="item.threshold"
                        label="Threshold"
                        type="number"
                        variant="outlined"
                        density="comfortable"
                        style="max-width: 120px;"
                      ></v-text-field>
                    </template>
                  </v-data-table>

                  <v-text-field
                    prepend-inner-icon="mdi-email"
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    color="primary"
                    variant="outlined"
                    required
                    :disabled="isLoading"
                    class="mt-4"
                  ></v-text-field>

                  <v-btn
                    width="100%"
                    color="primary"
                    size="large"
                    variant="outlined"
                    @click="registerAllAlerts"
                    :disabled="isLoading || selectedCoins.length === 0"
                  >
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      color="primary"
                      size="24"
                      class="mr-4"
                    ></v-progress-circular>
                    <v-icon
                      v-else
                      icon="mdi-email"
                      size="large"
                      start
                    ></v-icon>
                    Set Email
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col>
            <div class="d-flex flex-wrap ga-3 justify-center">
              <v-btn
                color="primary"
                size="large"
                variant="flat"
                :to="{ name: 'HomePage' }"
              >
                <v-icon
                  icon="mdi-home"
                  size="large"
                  start
                ></v-icon>
                Home
              </v-btn>

              <v-btn
                color="primary"
                size="large"
                variant="flat"
                href="https://github.com/Bobagi/Coin-Alert"
                target="_blank"
              >
                <v-icon
                  icon="mdi-github"
                  size="large"
                  start
                ></v-icon>
                GitHub
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cryptoList: [],
      isLoading: false,
      selectedCrypto: null,
      email: "",
      selectedCoins: [],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      selectedCryptoRules: [(v) => !!v || "Select a cryptocurrency"],
      loading: false,
      tableHeaders: [
        { text: "Crypto", value: "symbolAndId" },
        { text: "USD Price", value: "usdValue" },
        { text: "BRL Price", value: "brlValue" },
        { text: "Threshold", value: "threshold" },
      ],
    };
  },
  mounted() {
    this.reloadCryptoList();
  },
  methods: {
    showSnackbar(msg, isError = false) {
      this.$root.showSnackbar(msg, isError);
    },
    async reloadCryptoList() {
      try {
        this.isLoading = true;
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
            },
          }
        );
        this.cryptoList = res.data.map((c) => `${c.symbol} - ${c.id}`);
      } catch (err) {
        this.showSnackbar("Error loading cryptocurrencies: " + err, true);
      } finally {
        this.isLoading = false;
      }
    },
    async addCrypto() {
      if (!this.selectedCrypto) return;
      const symbolAndId = this.selectedCrypto;
      const id = symbolAndId.split(" - ")[1];
      const exists = this.selectedCoins.find(
        (c) => c.symbolAndId === symbolAndId
      );
      if (exists) {
        this.showSnackbar("This cryptocurrency is already added");
        return;
      }
      try {
        this.isLoading = true;
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: { ids: id, vs_currencies: "usd,brl" },
          }
        );
        const usdVal = res.data[id].usd.toFixed(2);
        const brlVal = res.data[id].brl.toFixed(2).replace(".", ",");
        const formattedUSD = `US$ ${usdVal.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}`;
        const formattedBRL = `R$ ${brlVal.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )}`;
        this.selectedCoins.push({
          symbolAndId,
          usdValue: formattedUSD,
          brlValue: formattedBRL,
          threshold: "",
        });
      } catch (err) {
        this.showSnackbar("Error fetching cryptocurrency price: " + err, true);
      } finally {
        this.isLoading = false;
      }
    },
    async registerAllAlerts() {
      if (!this.email || !/.+@.+\..+/.test(this.email)) {
        this.showSnackbar("Invalid email", true);
        return;
      }
      if (this.selectedCoins.length === 0) {
        this.showSnackbar("No cryptocurrencies added", true);
        return;
      }
      this.loading = true;
      this.isLoading = true;
      try {
        const payload = {
          email: this.email,
          coins: this.selectedCoins.map((c) => ({
            symbolAndId: c.symbolAndId,
            threshold: c.threshold.replace(",", "."),
          })),
        };
        const response = await axios.post("/registerAlert", payload);
        if (response.status === 201) {
          this.showSnackbar("Alerts registered successfully");
        } else if (response.status === 503) {
          this.showSnackbar("Failed to access CoinGecko API");
        } else {
          this.showSnackbar("Failed to register alerts", true);
        }
      } catch (err) {
        this.showSnackbar("Error registering alerts: " + err, true);
      } finally {
        this.loading = false;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.green-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(123, 255, 0));
}
.rotate {
  animation: rotate 1s infinite linear;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
