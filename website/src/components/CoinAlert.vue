<template>
  <v-container class="fill-height" fluid style="padding: 0">
    <v-row class="fill-height primaryRadial" justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="my-4"><span class="primary-color">Coin</span> Alert</h1>
        <v-divider class="my-4"></v-divider>
        <v-form ref="form">
          <v-row justify="center">
            <v-col cols="auto" md="8">
              <div>
                <a href="https://www.coingecko.com/" target="_blank">
                  <v-img
                    src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
                    height="100"
                    class="logo green-shadow mb-4"
                    alt="Coingecko website logo, an happy cartoon gecko"
                  />
                </a>
                <v-row>
                  <v-col cols="10" class="pr-0">
                    <v-autocomplete
                      id="autoCompleteCripto"
                      clearable
                      chips
                      closable-chips
                      color="secondary"
                      label="Cripto currency"
                      :items="cryptoList"
                      multiple
                      variant="outlined"
                      :disabled="isLoading"
                      v-model="selectedCryptos"
                      :rules="selectedCryptosRules"
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      icon="mdi-refresh"
                      color="primary"
                      size="large"
                      variant="outlined"
                      @click="reloadSymbols"
                      :disabled="isLoading"
                    >
                    </v-btn>
                  </v-col>
                </v-row>
                <div style="text-align: justify; margin-bottom: 10px">
                  <h2 v-if="Object.keys(selectedCryptosValues).length > 0">
                    Coins current value:
                  </h2>
                  <p
                    v-for="(value, symbol) in selectedCryptosValues"
                    :key="symbol"
                  >
                    {{ symbol }}: {{ value }}
                  </p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <v-text-field
                    prepend-inner-icon="mdi-currency-usd"
                    v-model="threshold"
                    :rules="thresholdRules"
                    label="Threshold"
                    color="primary"
                    variant="outlined"
                    type="number"
                    required
                  ></v-text-field>

                  <v-radio-group v-model="selectedCurrency">
                    <v-row>
                      <v-col cols="auto">
                        <v-radio label="usd($)" value="usd"></v-radio>
                      </v-col>
                      <v-col cols="auto">
                        <v-radio label="brl(R$)" value="brl"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </div>

                <v-text-field
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  color="primary"
                  variant="outlined"
                  required
                ></v-text-field>
                <v-btn
                  width="100%"
                  color="primary"
                  size="large"
                  variant="outlined"
                  @click="registerAlert"
                >
                  <v-icon icon="mdi-email" size="large" start></v-icon>
                  set email
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center">
          <v-col cols="auto" style="display: flex; gap: 15px">
            <v-btn
              color="primary"
              size="large"
              variant="flat"
              :to="{ name: 'HomePage' }"
            >
              <v-icon icon="mdi-home" size="large" start></v-icon>
              Home
            </v-btn>

            <v-btn
              color="primary"
              size="large"
              variant="flat"
              href="https://github.com/Bobagi/Coin-Alert"
              target="_blank"
            >
              <v-icon icon="mdi-github" size="large" start></v-icon>
              GitHub
            </v-btn>
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
      selectedCryptos: [],
      selectedCryptosValues: {},
      selectedCurrency: "usd",
      email: "",
      threshold: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      thresholdRules: [(v) => !!v || "Threshold is required"],
      selectedCryptosRules: [
        (v) => !!v.length || "At least one cryptocurrency must be selected",
      ],
    };
  },
  async mounted() {
    this.reloadSymbols();
  },
  watch: {
    selectedCryptos: {
      handler: "getSelectedCryptosValues",
      immediate: true,
    },
  },
  methods: {
    showSnackbar(message, isError = false) {
      this.$root.showSnackbar(message, isError);
    },
    async registerAlert() {
      try {
        const isValid = await this.$refs.form.validate();
        if (!isValid) return;

        const response = await axios.post("/api/cryptoAlert/registerAlert", {
          email: this.email,
          symbolAndId: this.selectedCryptos,
          threshold: this.threshold.replace(",", "."),
          usingUsd: this.selectedCurrency == "usd" ? true : false,
        });

        if (response.status === 201) {
          this.showSnackbar("Alert registered successfully");
        } else {
          this.showSnackbar("Failed to register alert", true);
        }
      } catch (error) {
        this.showSnackbar("Error trying to register alert", true);
        console.error("Error registering alert:", error);
      }
    },
    async reloadSymbols() {
      try {
        this.isLoading = true;
        const response = await axios.get(
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
        this.cryptoList = response.data.map(
          (crypto) => `${crypto.symbol} - ${crypto.id}`
        );
      } catch (error) {
        this.showSnackbar(
          "Failed on load crypto currencies from CoinGecko: " + error,
          true
        );
        console.error("Error fetching crypto list:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getSelectedCryptosValues() {
      const selectedCryptosValues = {};
      for (const symbol of this.selectedCryptos) {
        const id = symbol.split(" - ")[1];
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd,brl`
          );
          const usd = `$ ${response.data[id].usd.toFixed(2)}`;
          const brl = `R$ ${response.data[id].brl.toFixed(2)}`;
          selectedCryptosValues[symbol] = `${usd} --- ${brl}`;
        } catch (error) {
          this.showSnackbar(
            "Failed loading cripto currency current value: " + error,
            true
          );
          return;
        }
      }
      this.selectedCryptosValues = selectedCryptosValues;
    },
  },
};
</script>

<style scoped>
.green-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(123, 255, 0));
}
.link {
  margin-left: 20px;
}
.link > li > a {
  cursor: pointer; /* Show pointer cursor on hover */
}
.link > li > a:hover {
  color: white;
  transition: 200ms;
}
</style>
