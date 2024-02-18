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
                <p style="text-align: left">
                  The Coin Alert Project is a Python-based initiative designed
                  to help you stay informed about cryptocurrency values using
                  the Coingecko API. You can choose the cryptocurrency you're
                  interested in and set a specific value threshold. When the
                  coin reaches that value, an email will be sent to the email
                  address you've provided, alerting you to the change. While the
                  project is not currently operational, it's expected to be
                  functional soon. 😊
                </p>
                <br />
                <v-img
                  src="../../public/UnderDevopment.png"
                  height="400"
                  class="logo purple-shadow"
                  alt="Tor Project logo"
                  style="margin-bottom: 10px"
                />
                <br />
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
                      id="autoCompleteCrypto"
                      color="secondary"
                      label="Crypto currency"
                      :items="cryptoList"
                      variant="outlined"
                      :disabled="isLoading"
                      v-model="selectedCrypto"
                      :rules="selectedCryptosRules"
                      required
                      single-line
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
                      <v-icon
                        :class="{ rotate: isLoading }"
                        icon="mdi-refresh"
                        size="24"
                      ></v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div style="text-align: justify; margin-bottom: 10px">
                  <p v-if="selectedCrypto">
                    {{ selectedCrypto }} actual price:
                  </p>
                  <p v-if="selectedCrypto" class="primary-color">
                    {{ selectedCryptoValue }}
                  </p>
                  <v-divider v-if="selectedCrypto" class="my-4"></v-divider>
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
                    :disabled="isLoading"
                  ></v-text-field>

                  <v-radio-group
                    v-model="selectedCurrency"
                    :disabled="isLoading"
                  >
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
                  :disabled="isLoading"
                ></v-text-field>

                <v-btn
                  width="100%"
                  color="primary"
                  size="large"
                  variant="outlined"
                  @click="registerAlert"
                  :disabled="isLoading"
                >
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="primary"
                    size="24"
                    class="mr-4"
                  ></v-progress-circular>
                  <v-icon v-else icon="mdi-email" size="large" start></v-icon>
                  set email
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>

        <v-divider class="my-4"></v-divider>

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
      selectedCrypto: null,
      selectedCryptoValue: null,
      selectedCurrency: "usd",
      email: "",
      threshold: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      thresholdRules: [(v) => !!v || "Threshold is required"],
      selectedCryptosRules: [
        (v) => !!v || "At least one cryptocurrency must be selected",
      ],
      loading: false,
    };
  },
  async mounted() {
    this.reloadSymbols();
  },
  watch: {
    selectedCrypto: {
      handler: "getSelectedCryptoValue",
      immediate: true,
    },
  },
  methods: {
    showSnackbar(message, isError = false) {
      this.$root.showSnackbar(message, isError);
    },
    validateForm() {
      this.$refs.form.validate();

      const isEmailValid = this.email && /.+@.+\..+/.test(this.email);

      const isThresholdValid = this.threshold && this.threshold > 0;

      const isCryptosValid = !!this.selectedCrypto;

      return isEmailValid && isThresholdValid && isCryptosValid;
    },
    async registerAlert() {
      this.isLoading = true;
      this.loading = true;
      if (!this.validateForm()) {
        this.showSnackbar("Form is not valid, all fields are required!", true);
        this.isLoading = false;
        this.loading = false;
        return;
      }

      try {
        const response = await axios.post("/api/cryptoAlert/registerAlert", {
          email: this.email,
          symbolAndId: this.selectedCrypto,
          threshold: this.threshold.replace(",", "."),
          usingUsd: this.selectedCurrency == "usd" ? true : false,
        });

        if (response.status === 201) {
          this.showSnackbar("Alert registered successfully");
        } else if (response.status === 503) {
          this.showSnackbar("Failed to access CoinGecko API");
        } else {
          this.showSnackbar("Failed to register alert", true);
        }
      } catch (error) {
        this.showSnackbar("Error trying to register alert", true);
        console.error("Error registering alert:", error);
      } finally {
        this.isLoading = false;
        this.loading = false;
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
    async getSelectedCryptoValue() {
      if (!this.selectedCrypto) return;

      const id = this.selectedCrypto.split(" - ")[1];
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd,brl`
        );
        const usd = `$ ${response.data[id].usd.toFixed(2)}`;
        const brl = `R$ ${response.data[id].brl.toFixed(2)}`;
        this.selectedCryptoValue = `${usd} --- ${brl}`;
      } catch (error) {
        this.showSnackbar(
          "Failed loading crypto currency current value: " + error,
          true
        );
        return;
      }
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
.rotate {
  animation: rotate 1s infinite linear;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
