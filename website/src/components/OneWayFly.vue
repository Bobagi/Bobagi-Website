<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <div>
            <h1><span class="primary-color">One </span>Way Fly</h1>
          </div></v-row
        >

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col cols="auto" md="8">
            <div style="display: flex; gap: 15px">
              <div style="text-align: left; align-self: center">
                <label>
                  A game made for the
                  <a href="https://itch.io/jam/scorejam28">ScoreSpace Jam #28</a
                  >, my first game jam 🥳
                </label>
                <br />
                <br />
                <label>
                  🦜 Using <a href="https://lootlocker.com/">LootLocker</a> for
                  leaderboard system.
                </label>
                <br />
                <label> 🏆 Top 35% best. </label>
                <p>Made with unity.</p>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-divider class="ma-6"></v-divider>
        <v-row justify="center">
          <div>
            <iframe
              frameborder="0"
              src="https://itch.io/embed/2501426"
              class="iframe-container"
              ><a href="https://bobagi.itch.io/one-way-fly"
                >One Way Fly by Bobagi</a
              ></iframe
            >
          </div>
        </v-row>
        <v-divider class="ma-6"></v-divider>
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
              href="https://bobagi.itch.io/"
              target="_blank"
            >
              <v-icon icon="mdi-google-controller" size="large" start></v-icon>
              itch.io
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.iframe-container {
  width: 550px;
  height: 167px;
}

@media (max-width: 600px) {
  .iframe-container {
    width: 250px;
    height: 200px;
  }
}
</style>
