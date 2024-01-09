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
        <v-icon color="primary">{{ isDark ? "mdi-weather-night" : "mdi-weather-sunny" }}</v-icon>
      </v-btn>

      <!-- Show Sign In and Sign Up only if no user is logged in -->
      <v-btn v-if="!user" text color="primary" to="/SignIn">Sign In</v-btn>
      <v-btn v-if="!user" text color="primary" to="/SignUp">Sign Up</v-btn>

      <!-- Show Disconnect if a user is logged in -->
      <v-btn v-if="user" text color="primary" @click="disconnectUser">Disconnect</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { useTheme } from "vuetify";
import { ref } from "vue";
import { mapState, mapActions } from 'vuex';

export default {
  name: "AppBar",
  computed: {
    ...mapState(['user']), // Assuming 'user' holds the logged-in user data
  },
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
  methods: {
    ...mapActions(['logout']), // Assuming 'logout' is a Vuex action to clear user state

    disconnectUser() {
      this.logout(); // Call the Vuex action to log out the user
      // Additional logic if needed, e.g., redirect to home page
    }
  },
};
</script>
