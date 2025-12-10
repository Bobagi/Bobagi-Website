<template>
  <div class="landing-wrapper">
    <section
      id="intro"
      class="hero-section"
    >
      <div class="hero-surface">
        <p class="eyebrow">Portfolio</p>
        <h1 class="headline">
          {{ $t('greeting') }} <span class="emoji-wave">👋</span>
        </h1>
        <p class="subhead">
          {{ $t('introduction') }}
        </p>
        <p class="meta">
          {{ $t('currentlyLearning') }}
        </p>

        <div class="hero-actions">
          <v-btn
            color="primary"
            variant="flat"
            class="elevated-btn"
            href="https://www.paypal.com/donate?business=gustavoperin067%40gmail.com&item_name=Support+Gustavo's+Journey&currency_code=USD"
            target="_blank"
          >
            <v-icon start icon="mdi-coffee"></v-icon>
            {{ $t('buyCoffee') }}
          </v-btn>

          <v-btn
            color="primary"
            variant="outlined"
            class="outlined-btn"
            @click="copyEmail"
          >
            <v-tooltip activator="parent" location="bottom">
              {{ $t('copyClipboard') }}
            </v-tooltip>
            <v-icon start icon="mdi-email"></v-icon>
            {{ $t('contactMe') }}
          </v-btn>
        </div>

        <div class="social-actions">
          <v-btn
            size="large"
            color="black"
            variant="flat"
            href="https://github.com/Bobagi/"
            target="_blank"
            class="pill-btn"
          >
            <v-icon start icon="mdi-github"></v-icon>
            {{ $t('github') }}
          </v-btn>
          <v-btn
            size="large"
            color="indigo"
            variant="flat"
            href="https://www.linkedin.com/in/gustavoaperin/"
            target="_blank"
            class="pill-btn"
          >
            <v-icon start icon="mdi-linkedin"></v-icon>
            {{ $t('linkedin') }}
          </v-btn>
        </div>

        <p class="note"> <i>{{ $t('replyNote') }}</i> </p>
      </div>
    </section>

    <section class="projects-section">
      <div class="section-header">
        <p class="eyebrow subtle">Projetos destacados</p>
        <h2 class="section-title">Uma vitrine única com cartões imersivos</h2>
        <p class="section-subtitle">
          Cada projeto ganhou um cartão dedicado com luz, sombra e pequenas animações.
          Use o menu para deslizar até qualquer cartão rapidamente.
        </p>
      </div>

      <v-row class="project-grid" justify="center" align="stretch" dense>
        <v-col
          v-for="project in projects"
          :key="project.id"
          cols="12"
          md="6"
          lg="4"
          class="d-flex"
        >
          <section :id="project.id" class="w-100">
            <v-hover v-slot="{ props, isHovering }">
              <v-card
                v-bind="props"
                class="project-card"
                :class="{ 'project-card--hover': isHovering }"
                :style="project.cardStyle"
                rounded="xl"
                elevation="10"
              >
                <div class="card-glow" :style="project.glowStyle"></div>
                <div class="card-inner">
                  <div class="card-header">
                    <div class="badge accent-badge">{{ project.category }}</div>
                    <div class="chip-row">
                      <v-chip
                        v-for="badge in project.badges"
                        :key="badge"
                        color="primary"
                        variant="outlined"
                        size="small"
                        class="pill-chip"
                      >
                        {{ badge }}
                      </v-chip>
                    </div>
                  </div>

                  <v-img
                    v-if="project.image"
                    :src="project.image"
                    :alt="project.title"
                    height="160"
                    cover
                    class="floating-img"
                  ></v-img>

                  <h3 class="card-title">{{ project.title }}</h3>
                  <p class="card-description">{{ project.description }}</p>
                  <p class="card-highlight">{{ project.highlight }}</p>

                  <div class="action-row">
                    <v-btn
                      v-for="action in project.actions"
                      :key="action.label"
                      :href="action.href"
                      target="_blank"
                      color="primary"
                      variant="flat"
                      class="pill-btn elevated-btn"
                    >
                      <v-icon :icon="action.icon" start></v-icon>
                      {{ action.label }}
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-hover>
          </section>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import heroWarsImage from "@/assets/projects/herowars.png";
import projectZomboidImage from "@/assets/projects/programerzombie.png";
import mouseJigglerImage from "@/assets/projects/mouseJigglerIcon.jpg";

export default {
  name: "HomePage",
  data() {
    return {
      projects: [
        {
          id: "project-hero-wars",
          title: "Hero Wars Auto Play Bot",
          category: "Bot • Automação",
          description:
            "Automa as tarefas mais repetitivas da Domination Era para liberar seu tempo.",
          highlight:
            "Rework em andamento para suportar múltiplos monitores e tornar os loops mais inteligentes.",
          image: heroWarsImage,
          badges: ["Windows", "Domination Era"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,207,51,0.14), rgba(0,0,0,0.55));",
          glowStyle: "background: radial-gradient(circle, rgba(255,207,51,0.35), transparent 60%);",
          actions: [
            {
              label: "Download",
              icon: "mdi-download",
              href: "https://bobagi.net/downloads/dist.7z",
            },
            {
              label: "GitHub",
              icon: "mdi-github",
              href: "https://github.com/Bobagi/Hero-Wars-Auto-Play-Bot",
            },
          ],
        },
        {
          id: "project-zomboid",
          title: "Project Zomboid Server",
          category: "Infra • Multiplayer",
          description:
            "Servidor casual hospedado em Ubuntu para reunir a galera de forma estável.",
          highlight:
            "Documentado para você levantar um host próprio enquanto o servidor oficial está offline.",
          image: projectZomboidImage,
          badges: ["Ubuntu", "Steam", "BattleMetrics"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(0,0,0,0.65), rgba(255,255,255,0.04));",
          glowStyle: "background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%);",
          actions: [
            {
              label: "BattleMetrics",
              icon: "mdi-radar",
              href: "https://www.battlemetrics.com/servers/zomboid/24442372",
            },
            {
              label: "GitHub",
              icon: "mdi-github",
              href: "https://github.com/Bobagi/Zomboid-Ubuntu-Server",
            },
          ],
        },
        {
          id: "project-avarice",
          title: "Avarice Bot",
          category: "Discord • GPT",
          description:
            "Integra comandos do Discord com um servidor Project Zomboid e conversas assistidas por IA.",
          highlight:
            "Aceita sua própria API Key para manter a experiência segura e modular.",
          image: null,
          badges: ["Discord", "GPT", "Automação"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,207,51,0.2), rgba(0,0,0,0.65));",
          glowStyle: "background: radial-gradient(circle, rgba(255,207,51,0.3), transparent 60%);",
          actions: [
            {
              label: "GitHub",
              icon: "mdi-github",
              href: "https://github.com/Bobagi/Avarice",
            },
          ],
        },
        {
          id: "project-goldrush",
          title: "Goldrush Survivors",
          category: "Game • Unity",
          description:
            "Teste de conectividade WebGL com backend Node.js, ranking e armazenamento de itens.",
          highlight:
            "Disponível no itch.io; fica em modo draft quando a API está em manutenção.",
          image: null,
          badges: ["WebGL", "Unity", "Leaderboard"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.7));",
          glowStyle: "background: radial-gradient(circle, rgba(0,0,0,0.35), transparent 60%);",
          actions: [
            {
              label: "itch.io",
              icon: "mdi-google-controller",
              href: "https://bobagi.itch.io/goldrush-survivors",
            },
          ],
        },
        {
          id: "project-one-way-fly",
          title: "One Way Fly",
          category: "Game • Unity",
          description:
            "Experimento de gameplay casual com foco em movimentos rápidos e controles leves.",
          highlight:
            "Protótipo contínuo para testar shaders leves e animações responsivas.",
          image: null,
          badges: ["Prototype", "Casual", "PC"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,207,51,0.16), rgba(0,0,0,0.6));",
          glowStyle: "background: radial-gradient(circle, rgba(255,207,51,0.25), transparent 60%);",
          actions: [
            {
              label: "itch.io",
              icon: "mdi-google-controller",
              href: "https://bobagi.itch.io/",
            },
          ],
        },
        {
          id: "project-godot",
          title: "Dracomania 2024",
          category: "Game • Godot",
          description:
            "Fan game inspirado em Dracomania, produzido para web com engine Godot.",
          highlight:
            "Disponível no itch.io; versão embarcada em breve diretamente na página.",
          image: null,
          badges: ["Godot", "Web"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.7));",
          glowStyle: "background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 60%);",
          actions: [
            {
              label: "itch.io",
              icon: "mdi-google-controller",
              href: "https://bobagi.itch.io/dracomania",
            },
          ],
        },
        {
          id: "project-snowflake",
          title: "Snowflake",
          category: "Tools • Data",
          description:
            "Ferramentas para manipular dados com foco em visualização limpa e responsiva.",
          highlight:
            "Interface renovada em breve com mais gráficos e painéis modulados.",
          image: null,
          badges: ["Dashboard", "Data"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(0,0,0,0.65));",
          glowStyle: "background: radial-gradient(circle, rgba(255,255,255,0.16), transparent 60%);",
          actions: [
            {
              label: "Em breve",
              icon: "mdi-timer-sand",
              href: "https://github.com/Bobagi",
            },
          ],
        },
        {
          id: "project-coin-alert",
          title: "Coin Alert",
          category: "Tools • Alerts",
          description:
            "Monitoramento de preços de criptomoedas com notificações rápidas.",
          highlight:
            "Foco em tons amarelos e pretos para acompanhar o mercado em qualquer modo de tema.",
          image: null,
          badges: ["Crypto", "Notificações"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,207,51,0.18), rgba(0,0,0,0.62));",
          glowStyle: "background: radial-gradient(circle, rgba(255,207,51,0.22), transparent 60%);",
          actions: [
            {
              label: "GitHub",
              icon: "mdi-github",
              href: "https://github.com/Bobagi",
            },
          ],
        },
        {
          id: "project-mouse-jiggler",
          title: "Mouse Jiggler",
          category: "Tools • Desktop",
          description:
            "Mantém o computador ativo com movimentos sutis e configuráveis do cursor.",
          highlight:
            "Interface minimalista em amarelo e preto, pensada para uso prolongado.",
          image: mouseJigglerImage,
          badges: ["Windows", "Produtividade"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(0,0,0,0.55), rgba(255,207,51,0.2));",
          glowStyle: "background: radial-gradient(circle, rgba(255,207,51,0.28), transparent 60%);",
          actions: [
            {
              label: "Download",
              icon: "mdi-download",
              href: "https://github.com/Bobagi/MouseJiggler",
            },
          ],
        },
        {
          id: "project-chat-trainer",
          title: "Chat Trainer",
          category: "AI • Training",
          description:
            "Ferramenta experimental para ajustar respostas de chatbots com datasets customizados.",
          highlight:
            "Feedback visual realçado por brilhos suaves para destacar métricas de treino.",
          image: null,
          badges: ["AI", "Dataset"],
          cardStyle:
            "background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.68));",
          glowStyle: "background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%);",
          actions: [
            {
              label: "GitHub",
              icon: "mdi-github",
              href: "https://github.com/Bobagi",
            },
          ],
        },
      ],
    };
  },
  methods: {
    async copyEmail() {
      const email = "gustavoperin067@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        alert(this.$t("emailCopied"));
      } catch (err) {
        alert(this.$t("copyFailed"));
      }
    },
  },
};
</script>

<style scoped>
.landing-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 32px 12px 64px;
}

.hero-section {
  position: relative;
  padding: 48px;
  border-radius: 32px;
  overflow: hidden;
  background: radial-gradient(circle at 10% 20%, rgba(255, 207, 51, 0.18), transparent 40%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.08), transparent 35%),
    linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.55));
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.hero-surface {
  position: relative;
  z-index: 2;
  max-width: 980px;
}

.hero-section::after {
  content: "";
  position: absolute;
  inset: 12px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;
}

.headline {
  font-weight: 800;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  margin: 8px 0 12px;
}

.subhead {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.86);
  margin-bottom: 12px;
}

.meta {
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 20px;
}

.hero-actions,
.social-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.note {
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.62);
}

.projects-section {
  padding: 12px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7));
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.section-header {
  text-align: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.8rem;
  margin: 6px 0;
}

.section-subtitle {
  max-width: 720px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.75);
}

.project-grid {
  margin-top: 10px;
}

.project-card {
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  height: 100%;
}

.project-card--hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.35), 0 0 32px rgba(255, 207, 51, 0.08);
  border-color: rgba(255, 207, 51, 0.35);
}

.card-glow {
  position: absolute;
  inset: -12% 0 0 0;
  filter: blur(24px);
  opacity: 0.8;
}

.card-inner {
  position: relative;
  z-index: 2;
  padding: 22px 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.badge {
  font-size: 0.9rem;
  padding: 8px 14px;
  border-radius: 999px;
  color: #0b0b0b;
  background: linear-gradient(135deg, #ffd54f, #ffca28);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.chip-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.pill-chip {
  border-radius: 999px;
}

.floating-img {
  border-radius: 18px;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.card-title {
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 4px;
}

.card-description {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.5;
}

.card-highlight {
  color: #ffd54f;
  font-weight: 600;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.pill-btn {
  border-radius: 999px;
  text-transform: none;
  font-weight: 700;
}

.elevated-btn {
  box-shadow: 0 12px 24px rgba(255, 207, 51, 0.16);
}

.outlined-btn {
  border-color: rgba(255, 207, 51, 0.6) !important;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: #ffd54f;
  margin: 0;
}

.eyebrow.subtle {
  color: rgba(255, 255, 255, 0.6);
}

.meta,
.note {
  max-width: 720px;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  40% {
    transform: rotate(12deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.emoji-wave {
  display: inline-block;
  animation: wave 1.5s infinite ease-in-out;
  transform-origin: 70% 70%;
}

@media (max-width: 960px) {
  .hero-section {
    padding: 28px;
  }
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .hero-section {
    padding: 22px;
  }
  .landing-wrapper {
    padding: 24px 10px;
  }
  .projects-section {
    padding: 18px 12px;
  }
}
</style>
