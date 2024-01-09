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
        <v-icon color="primary">{{
          isDark ? "mdi-weather-night" : "mdi-weather-sunny"
        }}</v-icon>
      </v-btn>

      <!-- Show Sign In and Sign Up only if no user is logged in -->
      <v-btn v-if="!user" text color="primary" to="/SignIn">Sign In</v-btn>
      <v-btn v-if="!user" text color="primary" to="/SignUp">Sign Up</v-btn>

      <v-btn
        v-if="user"
        color="primary"
        icon="mdi-cog-outline"
        to="/UserConfig"
      ></v-btn>

      <!-- Show Disconnect if a user is logged in -->
      <v-btn
        v-if="user"
        text
        color="primary"
        prepend-icon="mdi-logout"
        @click="disconnectUser"
        >Disconnect</v-btn
      >
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { useTheme } from "vuetify";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "AppBar",
  setup() {
    const store = useStore();
    const theme = useTheme();
    const isDark = ref(false);

    const user = computed(() => store.state.user);

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
      isDark.value = theme.global.name.value !== "dark";
    }

    function disconnectUser() {
      store.dispatch("logout");
    }

    return {
      user,
      isDark,
      toggleIcon,
      disconnectUser,
    };
  },
};
</script>
