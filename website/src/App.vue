<template>
  <v-app>
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
    <AppBar @toggle-theme="toggleTheme" />
    <v-main id="mainDiv">
      <v-card class="rounded-0 h-100" color="contentbg">
        <!-- <header /> -->
        <v-container>
          <v-card id="mainCard" color="content" class="pa-4 shadow">
            <router-view></router-view>
          </v-card>
        </v-container>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :timeout="snackbarShowTime"
        :color="snackbarColor"
        elevation="24"
      >
        {{ snackbarMessage }}
      </v-snackbar>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<style>
.shadow {
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}
</style>

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

  data() {
    return {
      loading: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarShowTime: 4000,
    };
  },
  computed: {
    ...mapState(["snackbar"]),
  },
  methods: {
    toggleOverlay(show) {
      this.loading = show;
    },
    showSnackbar(message, isError = false) {
      this.snackbar = true;
      this.snackbarMessage = message;
      this.snackbarColor = isError ? "error" : "primary";
      setTimeout(() => {
        this.snackbar = false;
      }, this.snackbarShowTime);
    },
  },
};
</script>
