<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <div>
            <h1><span class="primary-color">Godot </span>Project</h1>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col
            cols="auto"
            md="8"
          >
            <div style="display: flex; gap: 15px">
              <div style="text-align: left; align-self: center">
                <label>
                  A fan game of Dracomania, by Elma Chips, made by me.
                </label>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row
          justify="center"
          v-if="!gameStarted"
        >
          <v-col
            cols="auto"
            style="display: flex; justify-content: center;"
          >
            <span title="Game is not available to run in that website yet.">
              <v-btn
                color="primary"
                size="large"
                @click="loadGame"
                disabled
              >
                Start Game
              </v-btn>
            </span>
          </v-col>
        </v-row>

        <v-row
          justify="center"
          v-show="gameStarted"
        >
          <v-col
            cols="auto"
            md="8"
          >
            <div class="game-wrapper">
              <iframe
                id="game-container"
                :src="gameUrl"
              ></iframe>
            </div>
          </v-col>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <div>
            <iframe
              frameborder="0"
              src="https://itch.io/embed/2734108"
              width="552"
              height="167"
            ><a href="https://bobagi.itch.io/dracomania">Dracomania 2024 by Bobagi</a></iframe>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col
            cols="auto"
            style="display: flex; gap: 15px"
          >
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
              ></v-icon> Home
            </v-btn>
            <v-btn
              color="primary"
              size="large"
              variant="flat"
              href="https://bobagi.itch.io/"
              target="_blank"
            >
              <v-icon
                icon="mdi-google-controller"
                size="large"
                start
              ></v-icon> itch.io
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GodotGameComponent",
  data() {
    return {
      gameUrl: "",
      gameStarted: false,
    };
  },
  methods: {
    loadGame() {
      this.gameUrl = "/Dracomania-godot/index.html";
      this.gameStarted = true;
    },
  },
};
</script>

<style scoped>
.game-wrapper {
  position: relative;
  padding-top: calc((1080 / 900) * 100%); /* 900x1080 proportion */
}

#game-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
