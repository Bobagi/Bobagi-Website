<template>
  <v-app>
    <AppBar />
    <v-main id="mainDiv">
      <div class="content">
        <!-- <header /> -->
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

  data: () => ({
    //
  }),
};
</script>
