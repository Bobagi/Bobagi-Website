<template>
  <v-app-bar class="glass-bar">
    <v-toolbar
      class="d-none d-md-flex"
      color="transparent"
      flat
    >
      <div class="d-flex align-center ga-2">
        <v-avatar
          color="primary"
          size="36"
          class="glow-avatar"
        >
          <v-icon color="white">mdi-star-four-points-outline</v-icon>
        </v-avatar>
        <span class="text-h6 font-weight-bold gradient-text">Bobagi Studio</span>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex ga-2">
        <v-btn
          class="chip-btn"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-compass"
          @click="emitNavigation('top')"
        >
          Início
        </v-btn>
        <v-btn
          class="chip-btn"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-rocket"
          @click="emitNavigation('projects')"
        >
          Projetos
        </v-btn>
        <v-btn
          class="chip-btn"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-controller-classic"
          @click="emitNavigation('games')"
        >
          Jogos
        </v-btn>
        <v-btn
          class="chip-btn"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-tools"
          @click="emitNavigation('tools')"
        >
          Ferramentas
        </v-btn>
        <v-btn
          class="chip-btn"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-email"
          @click="emitNavigation('contact')"
        >
          Contato
        </v-btn>
      </div>
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
        @click="disconnectUser"
      >
        Disconnect
      </v-btn>
    </v-toolbar>

    <v-toolbar
      class="d-flex d-md-none"
      color="transparent"
      flat
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
          class="ma-0 rounded-3"
        >
          <v-list-item @click="emitNavigation('top')">
            <v-list-item-title>
              <v-icon class="pb-1">mdi-compass</v-icon>
              Início
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="emitNavigation('projects')">
            <v-list-item-title>
              <v-icon class="pb-1">mdi-rocket</v-icon>
              Projetos
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="emitNavigation('games')">
            <v-list-item-title>
              <v-icon class="pb-1">mdi-controller-classic</v-icon>
              Jogos
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="emitNavigation('tools')">
            <v-list-item-title>
              <v-icon class="pb-1">mdi-tools</v-icon>
              Ferramentas
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="emitNavigation('contact')">
            <v-list-item-title>
              <v-icon class="pb-1">mdi-email</v-icon>
              Contato
            </v-list-item-title>
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
        @click="disconnectUser"
      >
        Disconnect
      </v-btn>
    </v-toolbar>
  </v-app-bar>
</template>

<style scoped>
.glass-bar {
  backdrop-filter: blur(16px);
  background: rgba(10, 12, 28, 0.7) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.chip-btn {
  border-radius: 999px;
  text-transform: none;
  letter-spacing: 0.4px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.2);
}

.gradient-text {
  background: linear-gradient(120deg, #8a6bff, #1fd1f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glow-avatar {
  box-shadow: 0 10px 25px rgba(31, 209, 249, 0.35);
}

.auto-width {
  display: inline-block;
  max-width: 79px !important;
}

::v-deep .v-select__menu-icon,
::v-deep .v-select__selection-text {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>

<script>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import { useStore } from "vuex";

export default {
  name: "AppBar",
  emits: ["toggle-theme", "navigate-section"],
  setup(_, { emit }) {
    const store = useStore();
    const theme = useTheme();
    const router = useRouter();
    const isDark = ref(false);
    const user = computed(() => store.state.user);
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
      emit("toggle-theme");
    }
    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
    }
    function updateIsDark() {
      isDark.value = theme.global.name.value !== "dark";
    }
    function disconnectUser() {
      store.dispatch("logout");
      router.push("/");
    }
    function emitNavigation(sectionId) {
      emit("navigate-section", sectionId);
    }
    return {
      user,
      isDark,
      toggleIcon,
      disconnectUser,
      selectedLocale,
      locales,
      emitNavigation,
    };
  },
};
</script>
