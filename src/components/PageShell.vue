<template>
  <div class="bp bps">
    <header class="nav">
      <div class="wrap nav-inner">
        <router-link
          to="/"
          class="brand"
        >
          <span class="mark">B</span>
          <span>bobagi</span>
        </router-link>
        <div class="nav-tools">
          <button
            class="toggle"
            aria-label="Switch language"
            @click="toggleLang"
          >
            <span
              class="flag"
              aria-hidden="true"
              v-html="locale === 'pt' ? FLAGS.br : FLAGS.us"
            ></span>
            <span class="mono lang-txt">{{ locale.toUpperCase() }}</span>
          </button>
        </div>
      </div>
    </header>

    <main class="wrap bps-main">
      <slot />
      <div class="bps-back">
        <router-link
          to="/"
          class="btn btn-ghost"
        ><span
          class="ico"
          v-html="ICONS.home"
        ></span>{{ $t('nav_home') }}</router-link>
      </div>
    </main>

    <footer>
      <div class="wrap foot-inner">
        <div class="foot-brand">
          © {{ year }} <span>bobagi</span><span class="foot-rights"> · {{ $t('foot_rights') }}</span>
        </div>
        <div class="foot-soc">
          <a
            href="https://github.com/Bobagi"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            v-html="ICONS.github"
          ></a>
          <a
            href="https://www.linkedin.com/in/gustavoaperin/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            v-html="ICONS.linkedin"
          ></a>
        </div>
        <div class="foot-meta">{{ $t('foot_update', { date: lastUpdate }) }}</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { FLAGS, ICONS, formatBuildDate } from "./bp-shared";

export default {
  name: "PageShell",
  setup() {
    const { locale } = useI18n();
    return { locale };
  },
  data() {
    return { FLAGS, ICONS };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    lastUpdate() {
      return formatBuildDate(this.locale);
    },
  },
  mounted() {
    try {
      const savedLang = localStorage.getItem("bobagi-lang");
      if (savedLang === "en" || savedLang === "pt") this.locale = savedLang;
    } catch (e) {
      /* ignore */
    }
    this.applyLangAttr();
  },
  methods: {
    toggleLang() {
      this.locale = this.locale === "en" ? "pt" : "en";
      this.applyLangAttr();
      try {
        localStorage.setItem("bobagi-lang", this.locale);
      } catch (e) {
        /* ignore */
      }
    },
    applyLangAttr() {
      document.documentElement.lang = this.locale === "pt" ? "pt-BR" : "en";
    },
  },
};
</script>

<style>
/* ====== Sub-page shell (reuses the .bp design system) ====== */
.bp.bps {
  display: flex;
  flex-direction: column;
}
.bp.bps .bps-main {
  flex: 1;
  width: 100%;
  padding-top: 56px;
  padding-bottom: 72px;
}
.bp .bps-back {
  margin-top: 44px;
}
.bp .pg-head {
  margin-bottom: 30px;
  max-width: 70ch;
}
.bp .pg-head h1 {
  font-family: "Archivo";
  font-weight: 900;
  font-size: clamp(32px, 5vw, 52px);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 10px 0 14px;
}
.bp .pg-head h1 .hl {
  color: var(--yellow);
}
.bp .pg-head .lead {
  color: var(--muted);
  font-size: 16.5px;
}
.bp .pg-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 34px;
  align-items: start;
  margin: 8px 0 26px;
}
.bp .pg-art {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 28px;
  display: grid;
  place-items: center;
}
.bp .pg-art img {
  max-width: 100%;
  max-height: 330px;
  border-radius: 12px;
}
.bp .pg-copy p {
  color: var(--muted);
  margin-bottom: 14px;
  max-width: 62ch;
}
.bp .pg-copy p b {
  color: var(--text);
}
.bp .pg-note {
  border: 1px solid var(--line-strong);
  border-left: 3px solid var(--yellow);
  background: var(--bg-2);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--muted);
  font-size: 14px;
  margin: 14px 0;
  max-width: 62ch;
}
.bp .pg-note.warn {
  border-left-color: #ff8b6b;
  color: #ffb49e;
}
.bp .pg-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}
.bp .pg-frame {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--bg-2);
  padding: 14px;
  display: inline-block;
}
.bp .dl-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}
.bp .dl-row .btn {
  justify-content: flex-start;
}
.bp .dl-note {
  font-size: 12.5px;
  color: var(--muted);
  font-family: "JetBrains Mono";
}
@media (max-width: 900px) {
  .bp .pg-grid {
    grid-template-columns: 1fr;
  }
}
</style>
