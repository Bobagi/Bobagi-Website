<template>
  <v-app>
    <AppBar />
    <v-main id="mainDiv">
      <div class="content">
        <img alt="Vue logo" src="./assets/logo.png" class="logo" />
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";

export default {
  name: "App",
  components: {
    AppBar,
  },
};
</script>

<style>
#mainDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.content {
  width: 100%;
  text-align: center;
}

.logo {
  max-width: 100%;
  height: auto;
}
</style>
