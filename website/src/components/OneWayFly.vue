<template>
  <v-container class="fill-height" fluid style="padding: 0">
    <v-row class="fill-height primaryRadial" justify="center">
      <v-col cols="12" class="text-center">
        <div style="margin: 10px">
          <h1><span class="primary-color">One </span>Way Fly</h1>
        </div>
        <v-divider class="my-4"></v-divider>

        <v-row justify="center">
          <v-col cols="auto" md="8">
            <div style="display: flex; gap: 15px">
              <div style="text-align: left; align-self: center">
                <label>
                  A game made for the
                  <a href="https://itch.io/jam/scorejam28"
                    >ScoreSpace Jam #28</a
                  >
                </label>
                <br />
                <br />
                <label> Top 35% best games. </label>
                <p>Made with unity.</p>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>

        <div>
          <iframe
            frameborder="0"
            src="https://itch.io/embed/2501426"
            width="552"
            height="167"
            ><a href="https://bobagi.itch.io/one-way-fly"
              >One Way Fly by Bobagi</a
            ></iframe
          >
        </div>

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
.orange-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(216, 128, 12));
}
</style>
