<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <div>
            <h1><span class="primary-color">Ava</span>rice</h1>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col cols="12" md="5" style="text-align: center">
            <v-img
              src="../../public/icon-llhama-alt.jpg"
              class="logo"
              style="max-height: 20em"
              alt="A cute and fluffy small llhama, drawned with a cartoon style"
            />
          </v-col>
          <v-col cols="12" md="7">
            <div style="text-align: left; align-self: center">
              <label>
                Avarice is a bot for Discord designed to integrate Discord with
                a Project Zomboid server direct from Steam servers and provide
                enhanced functionality through GPT AI interactions (needs an API
                Key to work properly).
              </label>
              <br />
              <br />
              <label style="font-style: italic">
                Obs: To use GPT functions, you need to provide your own API Key.
              </label>
              <br /><br />
              <label>
                For more details, please access the GitHub repository page.
              </label>
            </div>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col>
            <div class="d-flex flex-wrap ga-3 justify-center" justify="center">
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
            </div>
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
