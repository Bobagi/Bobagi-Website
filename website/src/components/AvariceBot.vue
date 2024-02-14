<template>
  <v-container class="fill-height" fluid style="padding: 0">
    <v-row class="fill-height primaryRadial" justify="center">
      <v-col cols="12" class="text-center">
        <div style="margin: 10px">
          <h1><span class="primary-color">Ava</span>rice</h1>
        </div>
        <v-divider class="my-4"></v-divider>

        <v-row justify="center">
          <v-col cols="auto" md="8">
            <div style="display: flex; gap: 15px">
              <img
                src="/icon-llhama-alt.jpg"
                class="logo"
                style="height: 20em"
                alt="Orion sprite"
              />
              <div style="text-align: left; align-self: center">
                <label>
                  Avarice is a bot for Discord designed to integrate Discord
                  with a Project Zomboid server and provide enhanced
                  functionality through GPT AI interactions (needs an API Key to
                  work properly).
                </label>
                <br />
                <br />
                <label style="font-style: italic">
                  Obs: To use GPT functions, you need to provide your own API
                  Key.
                </label>
                <br /><br />
                <label>
                  For more details, please access the GitHub repository page.
                </label>
              </div>
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
              href="https://github.com/Bobagi/Avarice"
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

<style scoped>
.orange-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(216, 128, 12));
}
</style>
