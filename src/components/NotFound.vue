<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          Oops... it looks like we couldn't find the page you're looking for.
        </h2>

        <v-img
          src="/404.png"
          class="mb-3"
          max-height="300"
        />

        <h3>Maybe it hasn't been discovered yet.</h3>
        <br />

        <v-btn
          color="primary"
          :to="{ name: 'HomePage' }"
        >
          <v-icon class="buttonIcon">mdi-home</v-icon>Home</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="not-found"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.not-found {
  text-align: center;
}
</style>
