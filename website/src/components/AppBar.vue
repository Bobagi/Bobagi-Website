<template>
  <v-app-bar app padless color="background">
    <!-- Use Vuetify's v-btn component for navigation links -->
    <v-toolbar-items>
      <v-btn text color="primary" to="/">Home</v-btn>
      <v-btn text color="primary" to="/newPage">New Page</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn icon @click="toggleIcon">
        <v-icon color="primary">
          {{ isDark ? "mdi-weather-night" : "mdi-weather-sunny" }}</v-icon
        >
      </v-btn>
      <v-btn text color="primary" to="/signIn">Sign In</v-btn>
      <v-btn text color="primary" to="/signUp">Sign Up</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { useTheme } from "vuetify";
import { ref } from "vue";

export default {
  name: "AppBar",
  setup() {
    const theme = useTheme();
    const isDark = ref(false); // Initial state is false

    function toggleIcon() {
      toggleTheme();
      isDarkTheme();
    }

    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
    }

    function isDarkTheme() {
      if (theme.global.name.value == "dark") {
        isDark.value = false;
      } else {
        isDark.value = true;
      }
    }

    return {
      isDark,
      toggleTheme,
      toggleIcon,
    };
  },
};
</script>
