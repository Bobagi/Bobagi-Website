<template>
  <v-app-bar>
    <v-toolbar
      class="d-none d-md-flex"
      color="background"
    >
      <v-btn
        text
        height="100%"
        color="primary"
        class="ma-0 rounded-0"
        to="/"
        prepend-icon="mdi-home"
      >
        Home
      </v-btn>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            height="100%"
            class="ma-0 rounded-0"
            v-bind="props"
          >
            Projects
          </v-btn>
        </template>
        <v-list
          color="primary"
          class="ma-0 rounded-0"
        >
          <v-list-item
            link
            to="/HeroWars"
          >
            <v-list-item-title>HeroWars</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/ProjectZomboid"
          >
            <v-list-item-title>Zomboid</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/Avarice"
          >
            <v-list-item-title>Avarice</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            height="100%"
            class="ma-0 rounded-0"
            v-bind="props"
          >
            Games
          </v-btn>
        </template>
        <v-list
          color="primary"
          class="ma-0 rounded-0"
        >
          <v-list-item
            link
            to="/GoldRush"
          >
            <v-list-item-title>Goldrush Survivors</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/OneWayFly"
          >
            <v-list-item-title>One Way Fly</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            height="100%"
            class="ma-0 rounded-0"
            v-bind="props"
          >
            Tools
          </v-btn>
        </template>
        <v-list
          color="primary"
          class="ma-0 rounded-0"
        >
          <v-list-item
            link
            to="/SnowFlake"
          >
            <v-list-item-title>Snowflake</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/CoinAlert"
          >
            <v-list-item-title>Coin Alert</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/MouseJiggler"
          >
            <v-list-item-title>Mouse Jiggler</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>

      <v-select
        v-model="selectedLocale"
        :items="locales"
        item-title="emoji"
        item-value="code"
        color="primary"
        hide-details
        variant="text"
        class="auto-width"
      ></v-select>

      <v-btn
        icon
        @click="toggleIcon"
        class="mr-2"
      >
        <v-icon color="primary">{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-toolbar
      class="d-flex d-md-none"
      color="background"
    >
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon
            color="primary"
            v-bind="props"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list
          color="primary"
          class="ma-0 rounded-0"
        >
          <v-list-item to="/">
            <v-list-item-title>
              <v-icon class="pb-1">mdi-home</v-icon>
              Home
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/HeroWars"
          >
            <v-list-item-title>HeroWars</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/ProjectZomboid"
          >
            <v-list-item-title>Zomboid</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/SnowFlake"
          >
            <v-list-item-title>Snowflake</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/MouseJiggler"
          >
            <v-list-item-title>Mouse Jiggler</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/Avarice"
          >
            <v-list-item-title>Avarice</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/CoinAlert"
          >
            <v-list-item-title>Coin Alert</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/GoldRush"
          >
            <v-list-item-title>Goldrush Survivors</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/OneWayFly"
          >
            <v-list-item-title>One Way Fly</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>

      <v-select
        v-model="selectedLocale"
        :items="locales"
        item-title="emoji"
        item-value="code"
        color="primary"
        hide-details
        variant="text"
        class="auto-width"
      ></v-select>

      <v-btn
        icon
        @click="toggleIcon"
        class="mr-2"
      >
        <v-icon color="primary">{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>

    </v-toolbar>
  </v-app-bar>
</template>

<style scoped>
::v-deep .v-select__menu-icon,
::v-deep .v-select__selection-text {
  color: rgb(var(--v-theme-primary)) !important;
}

.auto-width {
  display: inline-block;
  max-width: 79px !important;
}
</style>

<script>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

export default {
  name: "AppBar",
  setup() {
    const theme = useTheme();
    const isDark = ref(false);
    const { locale } = useI18n();
    const selectedLocale = ref(locale.value);
    watch(selectedLocale, (newLocale) => {
      locale.value = newLocale;
    });
    const locales = [
      { code: "en", emoji: "🇺🇸" },
      { code: "pt", emoji: "🇧🇷" },
    ];
    function toggleIcon() {
      toggleTheme();
      updateIsDark();
    }
    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
    }
    function updateIsDark() {
      isDark.value = theme.global.name.value !== "dark";
    }
    return {
      isDark,
      toggleIcon,
      selectedLocale,
      locales,
    };
  },
};
</script>
