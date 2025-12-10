<template>
  <v-card class="portfolio-card">
    <div class="card-glow" :style="glowStyle"></div>
    <v-card-title class="d-flex align-center ga-3">
      <v-avatar :style="avatarStyle" size="44">
        <v-icon color="white">{{ card.icon }}</v-icon>
      </v-avatar>
      <div>
        <div class="text-caption text-medium-emphasis">{{ card.subtitle || 'Showcase' }}</div>
        <div class="text-h6 font-weight-bold">{{ card.title }}</div>
      </div>
    </v-card-title>
    <v-card-text>
      <p class="text-body-2 text-medium-emphasis mb-4">{{ card.description }}</p>
      <div class="d-flex flex-wrap ga-2 mb-4">
        <v-chip
          v-for="badge in card.badges"
          :key="badge"
          size="small"
          variant="outlined"
          :style="chipStyle"
          class="rounded-pill"
        >
          {{ badge }}
        </v-chip>
      </div>
      <v-btn
        color="white"
        :style="actionStyle"
        class="rounded-pill"
        :to="card.to"
        :href="card.href"
        target="_blank"
        prepend-icon="mdi-arrow-right"
      >
        Explorar
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PortfolioCard",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  computed: {
    glowStyle() {
      return {
        background: `radial-gradient(circle at 20% 20%, ${this.card.accent}33, transparent 45%), radial-gradient(circle at 80% 0%, ${this.card.accent}22, transparent 40%)`,
      };
    },
    avatarStyle() {
      return {
        background: this.card.accent,
        boxShadow: `0 10px 30px ${this.card.accent}55`,
      };
    },
    chipStyle() {
      return {
        borderColor: this.card.accent,
        color: this.card.accent,
      };
    },
    actionStyle() {
      return {
        background: this.card.accent,
        boxShadow: `0 12px 24px ${this.card.accent}55`,
      };
    },
  },
};
</script>

<style scoped>
.portfolio-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.card-glow {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  pointer-events: none;
}
</style>
