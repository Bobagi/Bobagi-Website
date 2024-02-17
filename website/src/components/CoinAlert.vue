<template>
  <v-container class="fill-height" fluid style="padding: 0">
    <v-row class="fill-height primaryRadial" justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="my-4"><span class="primary-color">Coin</span> Alert</h1>
        <v-divider class="my-4"></v-divider>

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
              <div style="text-align: justify">
                <p>Coin 1: value</p>
                <p>Coin 2: value</p>
                <p>Coin 3: value</p>
                <p>Coin 4: value</p>
                <p>Coin 5: value</p>
              </div>

              <v-btn width="100%" color="primary" size="large" variant="flat">
                <v-icon icon="mdi-email" size="large" start></v-icon>
                set email
              </v-btn>
            </div>
          </v-col>
        </v-row>

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
    };
  },
  async mounted() {
    this.reloadSymbols();
  },
  methods: {
    showSnackbar(message) {
      this.$root.showSnackbar(message);
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
        this.showSnackbar(error);
        console.error("Error fetching crypto list:", error);
      } finally {
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
