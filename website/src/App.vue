<template>
  <v-app>
    <AppBar @toggle-theme="toggleTheme" />
    <v-main id="mainDiv">
      <v-card class="rounded-0 h-100" color="contentbg">
        <!-- <header /> -->
        <v-container>
          <v-card color="content" class="pa-4">
            <router-view></router-view>
          </v-card>
        </v-container>
      </v-card>
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
