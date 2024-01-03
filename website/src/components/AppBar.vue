<template>
  <v-app-bar app color="black">
    <!-- Use Vuetify's v-btn component for navigation links -->
    <v-toolbar-items>
      <v-btn text color="white" to="/">Home</v-btn>
      <v-btn text color="white" to="/newPage">New Page</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
};
</script>
