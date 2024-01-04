<template>
  <v-footer padless color="background" :elevation="24">
    <v-container fluid>
      <v-row justify="space-between">
        <v-col cols="auto">
          <p class="footer-text">
            &copy; {{ currentYear }} Bobagi. All rights reserved.
          </p>
        </v-col>
        <v-col cols="auto" style="padding: 0">
          <a href="https://www.linkedin.com/in/gustavoaperin/" target="_blank">
            <v-img
              :width="50"
              aspect-ratio="16/9"
              cover
              src="/bobagiCursiveTransp.png"
              alt="Bobagi wrote in a fancy hand-draw style"
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

<style scoped>
.footer-text {
  color: rgb(var(--v-theme-primary));
}
</style>
