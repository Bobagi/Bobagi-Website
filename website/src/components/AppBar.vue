<template>
  <v-app-bar>
    <!-- desktop toolbar -->
    <v-toolbar class="d-none d-sm-flex d-sm-none d-md-flex d-md-none d-lg-flex" color="background">
      <v-btn text height="100%" color="primary" class="ma-0 rounded-0" to="/" prepend-icon="mdi-home">Home</v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" height="100%" class="ma-0 rounded-0" v-bind="props">
            Projects</v-btn>
        </template>
        <v-list class="ma-0 rounded-0">
          <v-list-item link to="/HeroWars">
            <v-list-item-title class="tertiary-color">HeroWars</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/ProjectZomboid">
            <v-list-item-title class="tertiary-color">Zomboid</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/SnowFlake">
            <v-list-item-title class="tertiary-color">Snowflake</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Avarice">
            <v-list-item-title class="tertiary-color">Avarice</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/CoinAlert">
            <v-list-item-title class="tertiary-color">Coin Alert</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/ChatTrainer">
            <v-list-item-title class="tertiary-color">Chat Trainer</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" height="100%" class="ma-0 rounded-0" v-bind="props">Games</v-btn>
        </template>
        <v-list class="ma-0 rounded-0">
          <v-list-item link to="/TicTacToe">
            <v-list-item-title class="tertiary-color">Tic Tac Toe</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/GoldRush">
            <v-list-item-title class="tertiary-color">Goldrush Survivors</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/OneWayFly">
            <v-list-item-title class="tertiary-color">One Way Fly</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/GodotGame">
            <v-list-item-title class="tertiary-color">Godot Game</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleIcon" class="mr-2">
        <v-icon color="primary">{{
          isDark ? "mdi-weather-night" : "mdi-weather-sunny"
          }}</v-icon>
      </v-btn>

      <!-- Show Sign In and Sign Up only if no user is logged in -->
      <v-btn v-if="!user" text color="primary" to="/SignIn" class="rounded-0" height="100%">Sign In</v-btn>
      <v-btn v-if="!user" text color="primary" to="/SignUp" class="rounded-0" height="100%">Sign Up</v-btn>

      <v-btn v-if="user" color="primary" icon="mdi-cog-outline" to="/UserConfig" class="mr-2"></v-btn>

      <!-- Show Disconnect if a user is logged in -->
      <v-btn v-if="user" text class="ma-0" height="100%" color="primary" prepend-icon="mdi-logout"
        @click="disconnectUser">Disconnect</v-btn>
    </v-toolbar>

    <!-- mobile toolbar -->
    <v-toolbar class="d-flex d-sm-none d-sm-flex d-md-none d-md-flex d-lg-none" color="background">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-menu" color="primary" v-bind="props"></v-btn>
        </template>
        <v-list class="ma-0 rounded-0">
          <v-list-item to="/">
            <v-list-item-title class="tertiary-color"><v-icon class="pb-1">mdi-home</v-icon> Home</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/HeroWars">
            <v-list-item-title class="tertiary-color">HeroWars</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/ProjectZomboid">
            <v-list-item-title class="tertiary-color">Zomboid</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/SnowFlake">
            <v-list-item-title class="tertiary-color">Snowflake</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Avarice">
            <v-list-item-title class="tertiary-color">Avarice</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/CoinAlert">
            <v-list-item-title class="tertiary-color">Coin Alert</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/ChatTrainer">
            <v-list-item-title class="tertiary-color">Chat Trainer</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/TicTacToe">
            <v-list-item-title class="tertiary-color">Tic Tac Toe</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/GoldRush">
            <v-list-item-title class="tertiary-color">Goldrush Survivors</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/OneWayFly">
            <v-list-item-title class="tertiary-color">One Way Fly</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/GodotGame">
            <v-list-item-title class="tertiary-color">Godot Game</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>

      <v-btn icon @click="toggleIcon" class="mr-2">
        <v-icon color="primary">{{
          isDark ? "mdi-weather-night" : "mdi-weather-sunny"
          }}</v-icon>
      </v-btn>

      <!-- Show Sign In and Sign Up only if no user is logged in -->
      <v-btn v-if="!user" text height="100%" color="primary" to="/SignIn" class="rounded-0">Sign In</v-btn>
      <v-btn v-if="!user" text height="100%" color="primary" to="/SignUp" class="rounded-0">Sign Up</v-btn>

      <v-btn v-if="user" color="primary" icon="mdi-cog-outline" to="/UserConfig" class="mr-2"></v-btn>

      <!-- Show Disconnect if a user is logged in -->
      <v-btn v-if="user" text class="ma-0" height="100%" color="primary" prepend-icon="mdi-logout"
        @click="disconnectUser">Disconnect</v-btn>
    </v-toolbar>
  </v-app-bar>
</template>

<script>
import { useTheme } from "vuetify";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AppBar",
  setup() {
    const store = useStore();
    const theme = useTheme();
    const router = useRouter();
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
      router.push("/");
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
