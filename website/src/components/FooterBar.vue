<template>
  <v-footer padless color="background" :elevation="10">
    <v-container fluid>
      <v-row justify="space-between">
        <v-col>
          <p
            class="primary-color default-cursor"
            style="font-weight: bold; font-style: italic"
          >
            &copy; {{ currentYear }} Bobagi. All rights reserved.
          </p>
        </v-col>
        <v-col
          style="padding: 0; gap: 15px; justify-content: right; display: flex"
        >
          <p class="betweenLines" style="align-self: end">
            last update: 03/04/2024
          </p>
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
