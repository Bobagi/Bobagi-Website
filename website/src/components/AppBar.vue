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
            to="/TicTacToe"
          >
            <v-list-item-title>Tic Tac Toe</v-list-item-title>
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
        item-title="labelWithFlag"
        item-value="code"
        color="primary"
        hide-details
        variant="text"
        class="auto-width"
      >
        <template #selection="{ item }">
          <div class="locale-option">
            <span class="locale-flag">{{ item.raw.flagEmoji }}</span>
            <span class="locale-label">{{ item.raw.label }}</span>
          </div>
        </template>
        <template #item="{ item, props }">
          <v-list-item v-bind="props">
            <v-list-item-title>
              <div class="locale-option">
                <span class="locale-flag">{{ item.raw.flagEmoji }}</span>
                <span class="locale-label">{{ item.raw.label }}</span>
              </div>
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-select>

      <v-btn
        icon
        @click="handleThemeToggleClick"
        class="mr-2"
      >
        <v-icon color="primary">{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
      <v-btn
        v-if="!user"
        text
        color="primary"
        to="/SignIn"
        class="rounded-0"
        height="100%"
      >
        Sign In
      </v-btn>
      <v-btn
        v-if="!user"
        text
        color="primary"
        to="/SignUp"
        class="rounded-0"
        height="100%"
      >
        Sign Up
      </v-btn>
      <v-btn
        v-if="user"
        color="primary"
        icon
        to="/UserConfig"
        class="mr-2"
      >
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <v-btn
        v-if="user"
        text
        class="ma-0"
        height="100%"
        color="primary"
        prepend-icon="mdi-logout"
        @click="disconnectCurrentUser"
      >
        Disconnect
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
            to="/TicTacToe"
          >
            <v-list-item-title>Tic Tac Toe</v-list-item-title>
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
          item-title="labelWithFlag"
          item-value="code"
          color="primary"
          hide-details
          variant="text"
          class="auto-width"
        >
          <template #selection="{ item }">
            <div class="locale-option">
              <span class="locale-flag">{{ item.raw.flagEmoji }}</span>
              <span class="locale-label">{{ item.raw.label }}</span>
            </div>
          </template>
          <template #item="{ item, props }">
            <v-list-item v-bind="props">
              <v-list-item-title>
                <div class="locale-option">
                  <span class="locale-flag">{{ item.raw.flagEmoji }}</span>
                  <span class="locale-label">{{ item.raw.label }}</span>
                </div>
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-select>

      <v-btn
        icon
        @click="handleThemeToggleClick"
        class="mr-2"
      >
        <v-icon color="primary">{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>

      <v-btn
        v-if="!user"
        text
        height="100%"
        color="primary"
        to="/SignIn"
        class="rounded-0"
      >
        Sign In
      </v-btn>
      <v-btn
        v-if="!user"
        text
        height="100%"
        color="primary"
        to="/SignUp"
        class="rounded-0"
      >
        Sign Up
      </v-btn>
      <v-btn
        v-if="user"
        color="primary"
        icon
        to="/UserConfig"
        class="mr-2"
      >
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <v-btn
        v-if="user"
        text
        class="ma-0"
        height="100%"
        color="primary"
        prepend-icon="mdi-logout"
        @click="disconnectCurrentUser"
      >
        Disconnect
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
  max-width: 140px !important;
}

.locale-option {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.locale-flag {
  font-size: 16px;
}

.locale-label {
  font-size: 14px;
}
</style>

<script>
import { computed, defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import { useStore } from "vuex";

export default defineComponent({
  name: "AppBar",
  setup(props, { emit }) {
    const vuexStore = useStore();
    const vuetifyTheme = useTheme();
    const vueRouter = useRouter();
    const { locale } = useI18n();
    const isDark = ref(vuetifyTheme.global.current.value.dark);
    const user = computed(() => vuexStore.state.user);
    const locales = [
      { code: "en", label: "English", labelWithFlag: "🇺🇸 English", flagEmoji: "🇺🇸" },
      { code: "pt", label: "Português", labelWithFlag: "🇧🇷 Português", flagEmoji: "🇧🇷" },
    ];
    const selectedLocale = ref(locale.value);

    watch(selectedLocale, (newLocale) => {
      locale.value = newLocale;
    });

    function updateIsDarkFromTheme() {
      isDark.value = vuetifyTheme.global.current.value.dark;
    }

    function toggleThemeVariant() {
      vuetifyTheme.global.name.value = vuetifyTheme.global.current.value.dark
        ? "light"
        : "dark";
    }

    function handleThemeToggleClick() {
      toggleThemeVariant();
      updateIsDarkFromTheme();
      emit("toggle-theme", vuetifyTheme.global.name.value);
    }

    function disconnectCurrentUser() {
      vuexStore.dispatch("logout");
      vueRouter.push("/");
    }

    return {
      user,
      isDark,
      selectedLocale,
      locales,
      handleThemeToggleClick,
      disconnectCurrentUser,
    };
  },
});
</script>
