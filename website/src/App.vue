<template>
  <v-app>
    <div class="text-center">
      <v-overlay
        v-model="loading"
        :persistent="true"
        class="align-center justify-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </div>

    <!-- Sheet for particles.js background -->
    <v-sheet
      id="particles-js"
      color="contentbg"
      class="particles-bg"
    ></v-sheet>

    <AppBar @toggle-theme="toggleTheme" />

    <!-- Main content, with responsive margins -->
    <v-main
      id="mainDiv"
      class="content-above ma-xs-3 ma-sm-3 ma-md-12 ma-lg-16 ma-xl-16"
    >
      <v-card
        id="mainCard"
        color="content"
        class="pa-4 shadow"
      >
        <router-view></router-view>
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

    <!-- Footer, should be above particles.js -->
    <FooterBar class="footer-above" />
  </v-app>
</template>

<script>
// Declare particlesJS as a global variable for ESLint
/* global particlesJS */

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
    loadParticlesJS() {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.onload = () => {
        particlesJS("particles-js", {
          particles: {
            number: {
              value: 355,
              density: {
                enable: true,
                value_area: 789.1476416322727,
              },
            },
            color: {
              value: "#000000",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.48927153781200905,
              random: false,
              anim: {
                enable: true,
                speed: 0.2,
                opacity_min: 0,
                sync: false,
              },
            },
            size: {
              value: 2,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 83.91608391608392,
                size: 1,
                duration: 3,
                opacity: 1,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        });
      };
      document.head.appendChild(script);
    },
  },
  mounted() {
    this.loadParticlesJS();
  },
};
</script>

<style>
/* Custom CSS to make the particles.js background cover the entire page and stay behind the main content */
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Lower z-index to place it behind the content */
  pointer-events: none; /* Avoid interference with user interaction */
}

.content-above {
  position: relative;
  z-index: 2; /* Higher z-index to place the content above the particles */
}

/* Ensures Footer is above particles.js */
.footer-above {
  position: relative;
  z-index: 3; /* Higher z-index than content and particles.js */
}

@media (max-width: 600px) {
  #mainDiv {
    margin-top: 16px !important;
    margin-left: 16px !important;
    margin-right: 16px !important;
    margin-bottom: 16px !important;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  #mainDiv {
    margin-top: 24px !important;
    margin-left: 24px !important;
    margin-right: 24px !important;
    margin-bottom: 24px !important;
  }
}
</style>
