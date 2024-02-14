<template>
  <v-footer padless color="background" :elevation="10">
    <v-container fluid>
      <v-row justify="space-between">
        <v-col cols="auto">
          <p
            class="primary-color default-cursor"
            style="font-weight: bold; font-style: italic"
          >
            &copy; {{ currentYear }} Bobagi. All rights reserved.
          </p>
        </v-col>
        <!-- <v-col>
          <div style="text-align: right; height: 100%">
            <p class="betweenLines">last update: 02/14/2024</p>
          </div>
        </v-col> -->
        <v-row align="end">
          <v-col class="text-right pr-10">
            <p class="betweenLines">last update: 02/14/2024</p>
          </v-col>
        </v-row>
        <v-col cols="auto" style="padding: 0">
          <a href="https://www.linkedin.com/in/gustavoaperin/" target="_blank">
            <v-img
              :width="50"
              aspect-ratio="16/9"
              cover
              src="/bobagiCursiveTransp.png"
              alt="Bobagi wrote in a fancy hand-draw style"
              class="logo"
            ></v-img
          ></a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "FooterBar",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
