<template>
  <v-app-bar class="glass-appbar" flat>
    <v-toolbar color="background" class="d-none d-md-flex">
      <v-btn
        v-for="item in navigationItems"
        :key="item.target"
        text
        height="100%"
        color="primary"
        class="ma-0 navigation-btn"
        @click="handleNavigation(item.target)"
      >
        <v-icon start :icon="item.icon"></v-icon>
        {{ item.label }}
      </v-btn>

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

      <v-btn icon @click="toggleIcon" class="mr-2">
        <v-icon color="primary">{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-toolbar color="background" class="d-flex d-md-none">
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon color="primary" v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list color="primary" class="ma-0">
          <v-list-item
            v-for="item in navigationItems"
            :key="item.target"
            @click="handleNavigation(item.target)"
          >
            <v-list-item-title>
              <v-icon class="pb-1" :icon="item.icon"></v-icon>
              {{ item.label }}
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

      <v-btn icon @click="toggleIcon" class="mr-2">
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

.navigation-btn {
  border-radius: 0;
  text-transform: none;
  letter-spacing: 0.02em;
  font-weight: 700;
}

.glass-appbar {
  backdrop-filter: blur(12px);
  background: rgba(0, 0, 0, 0.55) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
</style>

<script>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

export default {
  name: "AppBar",
  emits: ["scroll-to-section", "toggle-theme"],
  setup(_, { emit }) {
    const theme = useTheme();
    const isDark = ref(false);
    const { locale, t } = useI18n();
    const selectedLocale = ref(locale.value);
    watch(selectedLocale, (newLocale) => {
      locale.value = newLocale;
    });
    const locales = [
      { code: "en", emoji: "🇺🇸" },
      { code: "pt", emoji: "🇧🇷" },
    ];

    const navigationItems = [
      { labelKey: "nav.home", target: "intro", icon: "mdi-home" },
      {
        labelKey: "nav.automation",
        target: "section-automation",
        icon: "mdi-robot-industrial",
      },
      { labelKey: "nav.games", target: "section-games", icon: "mdi-gamepad-square" },
      {
        labelKey: "nav.tools",
        target: "section-tools",
        icon: "mdi-briefcase-check",
      },
      { labelKey: "nav.ai", target: "section-ai", icon: "mdi-brain" },
    ];

    const localizedNavigationItems = computed(() =>
      navigationItems.map((item) => ({
        ...item,
        label: t(item.labelKey),
      })),
    );

    function handleNavigation(target) {
      emit("scroll-to-section", target);
    }

    function toggleIcon() {
      toggleTheme();
      updateIsDark();
      emit("toggle-theme");
    }

    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
    }

    function updateIsDark() {
      isDark.value = theme.global.name.value !== "dark";
    }

    return {
      isDark,
      toggleIcon,
      selectedLocale,
      locales,
      navigationItems: localizedNavigationItems,
      handleNavigation,
    };
  },
};
</script>
