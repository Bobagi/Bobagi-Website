<template>
  <div class="landing-wrapper">
    <section
      id="intro"
      class="hero-section"
    >
      <div class="hero-surface">
        <p class="eyebrow">{{ $t('portfolioLabel') }}</p>
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
        <p class="eyebrow subtle">{{ $t('projectsSection.eyebrow') }}</p>
        <h2 class="section-title">{{ $t('projectsSection.title') }}</h2>
        <p class="section-subtitle">{{ $t('projectsSection.subtitle') }}</p>
      </div>

      <section
        v-for="group in groupedProjects"
        :id="group.id"
        :key="group.id"
        class="project-group"
      >
        <div class="group-header">
          <div>
            <p class="eyebrow subtle">{{ group.eyebrow }}</p>
            <h3 class="group-title">{{ group.title }}</h3>
            <p class="group-description">{{ group.description }}</p>
          </div>
          <div class="group-divider"></div>
        </div>

        <v-row class="project-grid" justify="center" align="stretch" dense>
          <v-col
            v-for="project in group.projects"
            :key="project.id"
            cols="12"
            md="6"
            lg="6"
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
                  role="button"
                  @click="openProjectPage(project.routeName)"
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
                        :href="action.href || undefined"
                        :to="action.routeName ? { name: action.routeName } : undefined"
                        :target="action.href ? '_blank' : undefined"
                        color="primary"
                        variant="flat"
                        class="pill-btn elevated-btn"
                        @click.stop="handleActionClick(action)"
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
    </section>
  </div>
</template>

<script>
import { computed as vueComputed } from "vue";
import { useTheme } from "vuetify";
import heroWarsImage from "@/assets/projects/herowars.png";
import projectZomboidImage from "@/assets/projects/programerzombie.png";
import mouseJigglerImage from "@/assets/projects/mouseJigglerIcon.jpg";

export default {
  name: "HomePage",
  setup() {
    const theme = useTheme();
    const isDarkTheme = vueComputed(() => theme.global.current.value.dark);

    return { isDarkTheme };
  },
  data() {
    return {
      projectTypeSections: [
        {
          id: "section-automation",
          titleKey: "sectionHeaders.automation.title",
          eyebrowKey: "sectionHeaders.automation.eyebrow",
          descriptionKey: "sectionHeaders.automation.description",
        },
        {
          id: "section-games",
          titleKey: "sectionHeaders.games.title",
          eyebrowKey: "sectionHeaders.games.eyebrow",
          descriptionKey: "sectionHeaders.games.description",
        },
        {
          id: "section-tools",
          titleKey: "sectionHeaders.tools.title",
          eyebrowKey: "sectionHeaders.tools.eyebrow",
          descriptionKey: "sectionHeaders.tools.description",
        },
        {
          id: "section-ai",
          titleKey: "sectionHeaders.ai.title",
          eyebrowKey: "sectionHeaders.ai.eyebrow",
          descriptionKey: "sectionHeaders.ai.description",
        },
      ],
      projects: [
        {
          id: "project-hero-wars",
          typeKey: "section-automation",
          titleKey: "projects.heroWars.title",
          categoryKey: "projects.heroWars.category",
          descriptionKey: "projects.heroWars.description",
          highlightKey: "projects.heroWars.highlight",
          routeName: "HeroWars",
          image: heroWarsImage,
          badgeKeys: ["badges.windows", "badges.dominationEra"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,207,51,0.14), rgba(0,0,0,0.65));",
            light:
              "background: linear-gradient(135deg, rgba(255,207,51,0.18), rgba(255,255,255,0.72));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,207,51,0.35), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(255,207,51,0.28), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "HeroWars",
            },
            {
              labelKey: "actions.download",
              icon: "mdi-download",
              href: "https://bobagi.net/downloads/dist.7z",
            },
            {
              labelKey: "actions.github",
              icon: "mdi-github",
              href: "https://github.com/Bobagi/Hero-Wars-Auto-Play-Bot",
            },
          ],
        },
        {
          id: "project-zomboid",
          typeKey: "section-games",
          titleKey: "projects.zomboid.title",
          categoryKey: "projects.zomboid.category",
          descriptionKey: "projects.zomboid.description",
          highlightKey: "projects.zomboid.highlight",
          routeName: "ProjectZomboid",
          image: projectZomboidImage,
          badgeKeys: ["badges.ubuntu", "badges.steam", "badges.battleMetrics"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(0,0,0,0.75), rgba(255,255,255,0.08));",
            light:
              "background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,207,51,0.16));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(0,0,0,0.12), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "ProjectZomboid",
            },
            {
              labelKey: "actions.battlemetrics",
              icon: "mdi-radar",
              href: "https://www.battlemetrics.com/servers/zomboid/24442372",
            },
            {
              labelKey: "actions.github",
              icon: "mdi-github",
              href: "https://github.com/Bobagi/Zomboid-Ubuntu-Server",
            },
          ],
        },
        {
          id: "project-avarice",
          typeKey: "section-automation",
          titleKey: "projects.avarice.title",
          categoryKey: "projects.avarice.category",
          descriptionKey: "projects.avarice.description",
          highlightKey: "projects.avarice.highlight",
          routeName: "Avarice",
          image: null,
          badgeKeys: ["badges.discord", "badges.gpt", "badges.automation"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,207,51,0.2), rgba(0,0,0,0.7));",
            light:
              "background: linear-gradient(135deg, rgba(255,207,51,0.2), rgba(255,255,255,0.75));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,207,51,0.3), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(255,207,51,0.22), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "Avarice",
            },
            {
              labelKey: "actions.github",
              icon: "mdi-github",
              href: "https://github.com/Bobagi/Avarice",
            },
          ],
        },
        {
          id: "project-goldrush",
          typeKey: "section-games",
          titleKey: "projects.goldrush.title",
          categoryKey: "projects.goldrush.category",
          descriptionKey: "projects.goldrush.description",
          highlightKey: "projects.goldrush.highlight",
          routeName: "GoldRush",
          image: null,
          badgeKeys: ["badges.webgl", "badges.unity", "badges.leaderboard"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.75));",
            light:
              "background: linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,207,51,0.16));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(0,0,0,0.35), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(0,0,0,0.1), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "GoldRush",
            },
            {
              labelKey: "actions.itchio",
              icon: "mdi-google-controller",
              href: "https://bobagi.itch.io/goldrush-survivors",
            },
          ],
        },
        {
          id: "project-one-way-fly",
          typeKey: "section-games",
          titleKey: "projects.oneWayFly.title",
          categoryKey: "projects.oneWayFly.category",
          descriptionKey: "projects.oneWayFly.description",
          highlightKey: "projects.oneWayFly.highlight",
          routeName: "OneWayFly",
          image: null,
          badgeKeys: ["badges.prototype", "badges.casual", "badges.pc"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,207,51,0.16), rgba(0,0,0,0.65));",
            light:
              "background: linear-gradient(135deg, rgba(255,207,51,0.18), rgba(255,255,255,0.78));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,207,51,0.25), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(255,207,51,0.2), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "OneWayFly",
            },
            {
              labelKey: "actions.itchio",
              icon: "mdi-google-controller",
              href: "https://bobagi.itch.io/",
            },
          ],
        },
        {
          id: "project-godot",
          typeKey: "section-games",
          titleKey: "projects.dracomania.title",
          categoryKey: "projects.dracomania.category",
          descriptionKey: "projects.dracomania.description",
          highlightKey: "projects.dracomania.highlight",
          routeName: "GodotGame",
          image: null,
          badgeKeys: ["badges.godot", "badges.web"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.7));",
            light:
              "background: linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,207,51,0.18));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(0,0,0,0.12), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "GodotGame",
            },
            {
              labelKey: "actions.itchio",
              icon: "mdi-google-controller",
              href: "https://bobagi.itch.io/dracomania",
            },
          ],
        },
        {
          id: "project-snowflake",
          typeKey: "section-ai",
          titleKey: "projects.snowflake.title",
          categoryKey: "projects.snowflake.category",
          descriptionKey: "projects.snowflake.description",
          highlightKey: "projects.snowflake.highlight",
          routeName: "Snowflake",
          image: null,
          badgeKeys: ["badges.tor", "badges.privacy"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(0,0,0,0.7));",
            light:
              "background: linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,207,51,0.14));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,255,255,0.16), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(0,0,0,0.12), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "Snowflake",
            },
            {
              labelKey: "actions.learnMore",
              icon: "mdi-timer-sand",
              href: "https://snowflake.torproject.org/",
            },
          ],
        },
        {
          id: "project-coin-alert",
          typeKey: "section-tools",
          titleKey: "projects.coinAlert.title",
          categoryKey: "projects.coinAlert.category",
          descriptionKey: "projects.coinAlert.description",
          highlightKey: "projects.coinAlert.highlight",
          routeName: "CoinAlert",
          image: null,
          badgeKeys: ["badges.crypto", "badges.notifications"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,207,51,0.18), rgba(0,0,0,0.68));",
            light:
              "background: linear-gradient(135deg, rgba(255,207,51,0.2), rgba(255,255,255,0.8));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,207,51,0.22), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(255,207,51,0.18), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "CoinAlert",
            },
            {
              labelKey: "actions.githubRepository",
              icon: "mdi-github",
              href: "https://github.com/Bobagi",
            },
          ],
        },
        {
          id: "project-mouse-jiggler",
          typeKey: "section-tools",
          titleKey: "projects.mouseJiggler.title",
          categoryKey: "projects.mouseJiggler.category",
          descriptionKey: "projects.mouseJiggler.description",
          highlightKey: "projects.mouseJiggler.highlight",
          routeName: "MouseJiggler",
          image: mouseJigglerImage,
          badgeKeys: ["badges.windows", "badges.productivity"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(0,0,0,0.6), rgba(255,207,51,0.22));",
            light:
              "background: linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,207,51,0.18));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,207,51,0.28), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(0,0,0,0.1), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "MouseJiggler",
            },
            {
              labelKey: "actions.download",
              icon: "mdi-download",
              href: "https://github.com/Bobagi/MouseJiggler",
            },
          ],
        },
        {
          id: "project-chat-trainer",
          typeKey: "section-ai",
          titleKey: "projects.chatTrainer.title",
          categoryKey: "projects.chatTrainer.category",
          descriptionKey: "projects.chatTrainer.description",
          highlightKey: "projects.chatTrainer.highlight",
          routeName: "ChatTrainer",
          image: null,
          badgeKeys: ["badges.ai", "badges.dataset"],
          cardStyle: {
            dark:
              "background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.72));",
            light:
              "background: linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,207,51,0.18));",
          },
          glowStyle: {
            dark: "background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%);",
            light: "background: radial-gradient(circle, rgba(0,0,0,0.12), transparent 60%);",
          },
          actions: [
            {
              labelKey: "actions.viewPage",
              icon: "mdi-open-in-new",
              routeName: "ChatTrainer",
            },
            {
              labelKey: "actions.github",
              icon: "mdi-github",
              href: "https://github.com/Bobagi",
            },
          ],
        },
      ],
    };
  },
  computed: {
    localizedProjectTypeSections() {
      return this.projectTypeSections.map((section) => ({
        ...section,
        title: this.$t(section.titleKey),
        eyebrow: this.$t(section.eyebrowKey),
        description: this.$t(section.descriptionKey),
      }));
    },
    localizedProjects() {
      return this.projects.map((project) => ({
        ...project,
        title: this.$t(project.titleKey),
        category: this.$t(project.categoryKey),
        description: this.$t(project.descriptionKey),
        highlight: this.$t(project.highlightKey),
        cardStyle: this.isDarkTheme ? project.cardStyle.dark : project.cardStyle.light,
        glowStyle: this.isDarkTheme ? project.glowStyle.dark : project.glowStyle.light,
        badges: project.badgeKeys.map((badgeKey) => this.$t(badgeKey)),
        actions: project.actions.map((action) => ({
          ...action,
          label: this.$t(action.labelKey),
        })),
      }));
    },
    groupedProjects() {
      return this.localizedProjectTypeSections.map((section) => ({
        ...section,
        projects: this.localizedProjects.filter(
          (project) => project.typeKey === section.id,
        ),
      }));
    },
  },
  methods: {
    async copyEmail() {
      const email = "gustavoperin067@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        alert(this.$t("emailCopied"));
      } catch (copyError) {
        alert(this.$t("copyFailed"));
      }
    },
    handleActionClick(action) {
      if (action.routeName) {
        this.$router.push({ name: action.routeName });
      }
    },
    openProjectPage(routeName) {
      if (routeName) {
        this.$router.push({ name: routeName });
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
  background: transparent;
}

.hero-section {
  position: relative;
  padding: 48px;
  border-radius: 32px;
  overflow: hidden;
  background: radial-gradient(circle at 10% 20%, rgba(255, 207, 51, 0.18), transparent 40%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.1), transparent 35%),
    linear-gradient(135deg, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.58));
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-surface {
  position: relative;
  z-index: 2;
  max-width: 980px;
  text-align: center;
  margin: 0 auto;
}

.hero-section::after {
  content: "";
  position: absolute;
  inset: 12px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;
}

:deep(.v-theme--light) .hero-section {
  background: radial-gradient(circle at 10% 20%, rgba(255, 207, 51, 0.2), transparent 42%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.65), transparent 35%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 226, 135, 0.85));
  color: #0f0f0f;
}

:deep(.v-theme--light) .headline,
:deep(.v-theme--light) .subhead,
:deep(.v-theme--light) .meta,
:deep(.v-theme--light) .note {
  color: rgba(0, 0, 0, 0.82);
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
  justify-content: center;
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

:deep(.v-theme--light) .projects-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 223, 94, 0.2));
  border-color: rgba(0, 0, 0, 0.06);
  color: #0f0f0f;
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

:deep(.v-theme--light) .section-subtitle,
:deep(.v-theme--light) .group-description {
  color: rgba(0, 0, 0, 0.7);
}

.project-group {
  margin-top: 26px;
  padding: 18px 12px 8px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.6));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

:deep(.v-theme--light) .project-group {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 223, 94, 0.1));
  border-color: rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.06);
}

.group-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.group-title {
  margin: 4px 0;
  font-size: 1.35rem;
}

.group-description {
  color: rgba(255, 255, 255, 0.78);
  margin: 0;
}

.group-divider {
  min-width: 140px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 207, 51, 0.1), rgba(255, 207, 51, 0.8));
  box-shadow: 0 0 16px rgba(255, 207, 51, 0.4);
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
  color: #f5f5f5;
  cursor: pointer;
}

:deep(.v-theme--light) .project-card {
  color: #111111;
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 16px 26px rgba(0, 0, 0, 0.12);
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

:deep(.v-theme--light) .card-description {
  color: rgba(0, 0, 0, 0.78);
}

.card-highlight {
  color: #ffd54f;
  font-weight: 600;
}

:deep(.v-theme--light) .card-highlight {
  color: #b88600;
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
  .group-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .group-divider {
    width: 100%;
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
