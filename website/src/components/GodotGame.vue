<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <div>
            <h1><span class="primary-color">Godot </span>Game</h1>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col cols="auto" md="8">
            <div class="game-wrapper">
              <iframe id="game-container" :src="gameUrl"></iframe>
            </div>
          </v-col>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-btn color="primary" size="large" variant="flat" :to="{ name: 'HomePage' }">
            <v-icon icon="mdi-home" size="large" start></v-icon> Home
          </v-btn>
          <v-btn color="primary" size="large" variant="flat" href="https://bobagi.itch.io/" target="_blank">
            <v-icon icon="mdi-google-controller" size="large" start></v-icon> itch.io
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'GodotGameComponent',
  data() {
    return {
      gameUrl: '/godot/game.html'
    };
  }
}
</script>

<style scoped>
.game-wrapper {
  position: relative;
  padding-top: calc((648 / 1152) * 100%); /* 1152x648 proportion */
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