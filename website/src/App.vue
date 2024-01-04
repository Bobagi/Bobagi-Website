<template>
  <v-app>
    <AppBar @toggle-theme="toggleTheme" />
    <v-main id="mainDiv">
      <div class="content">
        <!-- <header /> -->
        <router-view></router-view>
      </div>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  name: "App",

  components: {
    AppBar,
    FooterBar,
  },

  data() {},
};
</script>
