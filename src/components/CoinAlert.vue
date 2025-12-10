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
          <v-col cols="12" md="8">
            <p class="mb-4">
              Coin Alert is a lightweight Python tool that monitors cryptocurrency prices via the
              CoinGecko API and notifies you when a configured threshold is reached. With the backend removed
              from this repository, this page now serves as a portfolio showcase describing how the alerting workflow
              operates instead of collecting new registrations.
            </p>

            <v-alert
              type="info"
              variant="tonal"
              color="primary"
              class="mb-6"
            >
              The current site build is entirely client-side and static. To use Coin Alert, clone the dedicated project
              repository and run the CLI utility described there.
            </v-alert>

            <v-card class="mb-6" elevation="1">
              <v-card-title class="text-h6">Key capabilities</v-card-title>
              <v-card-text>
                <v-list density="comfortable">
                  <v-list-item title="Price tracking for multiple cryptocurrencies"></v-list-item>
                  <v-list-item title="Independent thresholds per asset"></v-list-item>
                  <v-list-item title="Email notifications when a target is reached"></v-list-item>
                  <v-list-item title="One-week monitoring window to conserve resources"></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <v-card elevation="1">
              <v-card-title class="text-h6">Explore the project</v-card-title>
              <v-card-text>
                <p class="mb-4">
                  Review the source code, configuration instructions, and usage examples directly in the repository.
                  The standalone project includes the scripts required to set alerts locally without depending on a web
                  backend.
                </p>
                <div class="d-flex flex-wrap ga-3">
                  <v-btn
                    color="primary"
                    size="large"
                    variant="flat"
                    href="https://github.com/Bobagi/Coin-Alert"
                    target="_blank"
                  >
                    <v-icon icon="mdi-github" start></v-icon>
                    GitHub
                  </v-btn>
                  <v-btn
                    color="primary"
                    size="large"
                    variant="outlined"
                    :to="{ name: 'HomePage' }"
                  >
                    <v-icon icon="mdi-home" start></v-icon>
                    Home
                  </v-btn>
                  <v-btn
                    color="secondary"
                    size="large"
                    variant="text"
                    href="https://www.coingecko.com/"
                    target="_blank"
                  >
                    <v-icon icon="mdi-link-variant" start></v-icon>
                    CoinGecko API
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CoinAlert",
};
</script>
