<template>
  <v-container>
    <v-row>
      <v-col>
        <a href="https://www.hero-wars.com/" target="_blank">
          <v-img
            src="/herowars.png"
            height="100"
            class="logo orange-shadow mb-6"
            alt="Hero Wars logo"
          />
        </a>

        <v-row justify="center">
          <div style="margin: 10px">
            <h1><span class="primary-color">Auto</span> play Bot</h1>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col cols="12" md="5" style="text-align: center">
            <img
              src="/Browser_Orion.png"
              class="logo"
              style="max-height: 20em"
              alt="Orion sprite"
            />
          </v-col>
          <v-col cols="12" md="7">
            <div style="text-align: left; align-self: center">
              <label id="botDescription" style="text-align: left">
                This bot is an autoplay bot designed for the game Hero Wars
                Domination Era. It automates the repetitive tasks of climbing
                the tower and conquering the Titan's Dungeon, saving you from
                the mechanical work and allowing you to focus on the more
                enjoyable aspects of the game.
                <br /><br />
                To use that application, just download it and read the
                <span class="primary-color">README</span> file, follow the
                instructions and run the executable file. <br /><br />
                Only available for Windows OS.
                <br />
                <br />
                <label style="color: red">
                  Actually, the bot is unavailable due to issues with
                  multi-scale monitors. I hope to find time to make the
                  necessary fixes to bring it back to life. 🙏
                </label>
                <br />
                <br />
                <label style="color: red"> Reworking in progress ⚙️</label>
              </label>
            </div>
          </v-col>
        </v-row>
        <v-divider class="ma-6"></v-divider>
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
                href="https://bobagi.net/downloads/dist.7z"
                target="_blank"
              >
                <v-icon icon="mdi-download" size="large" start></v-icon>
                Download
              </v-btn>

              <v-btn
                color="primary"
                size="large"
                variant="flat"
                href="https://github.com/Bobagi/Hero-Wars-Auto-Play-Bot"
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
