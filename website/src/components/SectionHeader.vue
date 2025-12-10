<template>
  <div class="section-header d-flex align-center ga-3 mb-4">
    <v-avatar
      size="44"
      class="header-avatar"
      color="primary"
    >
      <v-icon color="white">{{ icon }}</v-icon>
    </v-avatar>
    <div>
      <div class="text-subtitle-1 font-weight-bold">{{ title }}</div>
      <div class="text-body-2 text-medium-emphasis">{{ subtitle }}</div>
    </div>
    <div class="header-line flex-grow-1"></div>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.section-header {
  position: sticky;
  top: 12px;
  z-index: 1;
  backdrop-filter: blur(6px);
}

.header-avatar {
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
}

.header-line {
  height: 2px;
  background: linear-gradient(90deg, rgba(138, 107, 255, 0.8), rgba(31, 209, 249, 0));
  border-radius: 999px;
}
</style>
