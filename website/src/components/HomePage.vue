<template>
  <div
    id="top"
    class="single-page"
  >
    <section class="hero-panel">
      <v-container class="py-12">
        <v-row class="align-center">
          <v-col
            cols="12"
            md="7"
          >
            <div class="overline-pill">Experiência Imersiva</div>
            <h1 class="text-h3 text-md-h2 font-weight-black gradient-text mb-4">
              {{ $t('greeting') }} 👋<br />
              {{ $t('introduction') }}
            </h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-6">
              {{ $t('currentlyLearning') }}
            </p>
            <div class="d-flex flex-wrap ga-3 mb-6">
              <v-chip
                v-for="tag in heroTags"
                :key="tag"
                color="primary"
                variant="elevated"
                class="glass-chip"
              >
                {{ tag }}
              </v-chip>
            </div>
            <div class="d-flex flex-wrap ga-4">
              <v-btn
                color="primary"
                size="large"
                prepend-icon="mdi-coffee"
                class="rounded-pill"
                href="https://www.paypal.com/donate?business=gustavoperin067%40gmail.com&item_name=Support+Gustavo's+Journey&currency_code=USD"
                target="_blank"
              >
                {{ $t('buyCoffee') }}
              </v-btn>
              <v-btn
                color="primary"
                size="large"
                variant="outlined"
                prepend-icon="mdi-email"
                class="rounded-pill"
                @click="copyEmailToClipboard"
              >
                {{ $t('contactMe') }}
              </v-btn>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="5"
          >
            <v-card class="hero-card glass-card">
              <v-card-title class="d-flex align-center ga-2">
                <v-avatar color="primary" size="44">
                  <v-icon color="white">mdi-lightsaber</v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-2 text-medium-emphasis">Fluxo único</div>
                  <div class="text-h6 font-weight-bold">Navegue por cartões animados</div>
                </div>
              </v-card-title>
              <v-card-text>
                <p class="text-body-2 text-medium-emphasis mb-4">
                  Explore todos os projetos, jogos e ferramentas em uma única página com transições suaves e visual futurista.
                </p>
                <div class="floating-orb"></div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section id="projects" class="section-container">
      <SectionHeader
        icon="mdi-rocket"
        title="Projetos Destacados"
        subtitle="Cards fluídos, tons neon e uma experiência mais orgânica."
      />
      <v-container class="py-6">
        <v-row class="ga-4">
          <v-col
            v-for="projectCard in projectCards"
            :key="projectCard.title"
            cols="12"
            md="4"
          >
            <PortfolioCard :card="projectCard" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section id="games" class="section-container">
      <SectionHeader
        icon="mdi-controller-classic"
        title="Jogos"
        subtitle="Mini games com novas sombras, brilhos e formas suaves."
      />
      <v-container class="py-6">
        <v-row class="ga-4">
          <v-col
            v-for="gameCard in gameCards"
            :key="gameCard.title"
            cols="12"
            md="4"
          >
            <PortfolioCard :card="gameCard" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section id="tools" class="section-container">
      <SectionHeader
        icon="mdi-tools"
        title="Ferramentas"
        subtitle="Utilidades com efeito de vidro e bordas arredondadas."
      />
      <v-container class="py-6">
        <v-row class="ga-4">
          <v-col
            v-for="toolCard in toolCards"
            :key="toolCard.title"
            cols="12"
            md="4"
          >
            <PortfolioCard :card="toolCard" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section id="contact" class="section-container">
      <SectionHeader
        icon="mdi-email"
        title="Contato"
        subtitle="Fale comigo ou acompanhe redes sociais no mesmo fluxo."
      />
      <v-container class="py-6">
        <v-row class="ga-4">
          <v-col
            v-for="contactCard in contactCards"
            :key="contactCard.title"
            cols="12"
            md="6"
          >
            <PortfolioCard :card="contactCard" />
          </v-col>
        </v-row>
        <p class="mt-6 text-caption text-medium-emphasis text-center">
          <i>{{ $t('replyNote') }}</i>
        </p>
      </v-container>
    </section>
  </div>
</template>

<script>
import PortfolioCard from "./PortfolioCard.vue";
import SectionHeader from "./SectionHeader.vue";

export default {
  name: "HomePage",
  components: {
    PortfolioCard,
    SectionHeader,
  },
  data() {
    return {
      heroTags: ["Vue 3", "Vuetify 3", "Design Responsivo", "Animações suaves"],
      projectCards: [
        {
          title: "HeroWars",
          description: "Dashboard com partículas, luzes e interface repaginada para monitorar batalhas.",
          icon: "mdi-sword-cross",
          accent: "#7C4DFF",
          to: "/HeroWars",
          badges: ["Dashboard", "Real-time", "Visual Futurista"],
        },
        {
          title: "Project Zomboid",
          description: "Ferramentas e guias em um layout mais suave para sobrevivência em Zomboid.",
          icon: "mdi-biohazard",
          accent: "#00E5FF",
          to: "/ProjectZomboid",
          badges: ["Guia", "Sobrevivência", "UI Curvas"],
        },
        {
          title: "Avarice",
          description: "Bot inteligente com cartões luminosos e call-to-action elegante.",
          icon: "mdi-robot-love",
          accent: "#F50057",
          to: "/Avarice",
          badges: ["Automação", "Discord", "UX"],
        },
      ],
      gameCards: [
        {
          title: "Tic Tac Toe",
          description: "Jogue com animações suaves e botões arredondados e brilhantes.",
          icon: "mdi-grid",
          accent: "#FFCA28",
          to: "/TicTacToe",
          badges: ["Casual", "Animação", "Modo claro/escuro"],
        },
        {
          title: "Goldrush Survivors",
          description: "Explore a sobrevivência com visual dourado e sombras profundas.",
          icon: "mdi-pickaxe",
          accent: "#FFB300",
          to: "/GoldRush",
          badges: ["Survivor", "Pixel Art", "Dinâmico"],
        },
        {
          title: "One Way Fly",
          description: "Partidas rápidas com cartões vibrantes e feedback visual instantâneo.",
          icon: "mdi-airplane-takeoff",
          accent: "#00C853",
          to: "/OneWayFly",
          badges: ["Arcade", "Rápido", "Vibrante"],
        },
      ],
      toolCards: [
        {
          title: "Snowflake",
          description: "Efeito de neve com partículas translúcidas em um card de vidro estilizado.",
          icon: "mdi-snowflake",
          accent: "#80D8FF",
          to: "/Snowflake",
          badges: ["Partículas", "Inverno", "Leve"],
        },
        {
          title: "Coin Alert",
          description: "Alertas de moedas com LEDs virtuais e degradê sofisticado.",
          icon: "mdi-coin",
          accent: "#26C6DA",
          to: "/CoinAlert",
          badges: ["Cripto", "Alertas", "Glassmorphism"],
        },
        {
          title: "Mouse Jiggler",
          description: "Simulador com novos efeitos de luz, mantido minimalista e redondo.",
          icon: "mdi-mouse-variant",
          accent: "#FF6E40",
          to: "/MouseJiggler",
          badges: ["Produtividade", "Simulação", "Brilho"],
        },
      ],
    };
  },
  computed: {
    contactCards() {
      return [
        {
          title: this.$t("github"),
          description: "Repositórios com novas vitrines e documentação para cada projeto.",
          icon: "mdi-github",
          accent: "#212121",
          href: "https://github.com/Bobagi/",
          badges: ["Código", "Open Source", "Portfólio"],
        },
        {
          title: this.$t("linkedin"),
          description: "Atualizações de carreira e posts com visual moderno e interativo.",
          icon: "mdi-linkedin",
          accent: "#2962FF",
          href: "https://www.linkedin.com/in/gustavoaperin/",
          badges: ["Networking", "Carreira", "Posts"],
        },
      ];
    },
  },
  methods: {
    async copyEmailToClipboard() {
      const professionalEmail = "gustavoperin067@gmail.com";
      try {
        await navigator.clipboard.writeText(professionalEmail);
        alert(this.$t("emailCopied"));
      } catch (clipboardError) {
        alert(this.$t("copyFailed"));
        console.error(clipboardError);
      }
    },
  },
};
</script>

<style scoped>
.single-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero-panel {
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 20% 20%, rgba(124, 77, 255, 0.18), transparent 40%),
    radial-gradient(circle at 80% 10%, rgba(0, 229, 255, 0.18), transparent 40%),
    linear-gradient(135deg, rgba(14, 17, 40, 0.9), rgba(10, 12, 28, 0.8));
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
  margin-top: -32px;
}

.hero-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(124, 77, 255, 0.25), rgba(31, 209, 249, 0.25));
  mix-blend-mode: screen;
  opacity: 0.4;
  pointer-events: none;
}

.glass-card {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.28);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.hero-card {
  min-height: 220px;
}

.floating-orb {
  position: absolute;
  right: -40px;
  bottom: -40px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(124, 77, 255, 0.35), transparent 65%),
    radial-gradient(circle at 70% 70%, rgba(0, 229, 255, 0.2), transparent 60%);
  filter: blur(6px);
}

.section-container {
  padding: 12px 0 6px 0;
}

.overline-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 16px;
}

.glass-chip {
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(8px);
}

.gradient-text {
  background: linear-gradient(120deg, #8a6bff, #1fd1f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 960px) {
  .hero-panel {
    margin-top: 0;
  }
}
</style>
