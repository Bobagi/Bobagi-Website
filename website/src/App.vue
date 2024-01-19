<template>
  <v-app>
    <AppBar @toggle-theme="toggleTheme" />
    <div class="text-center">
      <v-overlay
        v-model="loading"
        :persistent="true"
        class="align-center justify-center"
        ><v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular
      ></v-overlay>
    </div>
    <v-main id="mainDiv">
      <v-card class="rounded-0 h-100" color="contentbg">
        <!-- <header /> -->
        <v-container>
          <v-card color="content" class="pa-4">
            <router-view></router-view>
          </v-card>
        </v-container>
      </v-card>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="4000"
        color="primary"
        elevation="24"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import FooterBar from "./components/FooterBar.vue";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    AppBar,
    FooterBar,
  },

  data() {},
  computed: {
    ...mapState(["snackbar"]),
  },
};
</script>
