<template>
  <PageShell v-if="study">
    <div class="pg-head">
      <div class="sec-tag">{{ $t('cs_tag') }}</div>
      <h1 v-html="study.titleHtml"></h1>
      <p class="lead">{{ $t(study.subKey) }}</p>
      <div class="tags" style="margin-top: 14px">
        <span
          v-for="t in study.tags"
          :key="t"
          class="tag"
        >{{ t }}</span>
      </div>
      <div class="pg-actions">
        <a
          class="btn btn-primary"
          :href="study.live"
          target="_blank"
          rel="noopener"
        ><span
          class="ico"
          v-html="ICONS.external"
        ></span>{{ study.liveLabel }}</a>
        <a
          class="btn btn-ghost"
          :href="study.github"
          target="_blank"
          rel="noopener"
        ><span
          class="ico"
          v-html="ICONS.github"
        ></span>GitHub</a>
      </div>
    </div>

    <h2 class="cs-h2">{{ $t('cs_numbers') }}</h2>
    <div class="facts cs-facts">
      <div
        v-for="f in study.facts"
        :key="f.k"
        class="fact"
      >
        <div class="n">{{ f.n }}</div>
        <div class="l">{{ $t(f.k) }}</div>
      </div>
    </div>

    <h2 class="cs-h2">{{ $t('cs_story') }}</h2>
    <div class="pg-copy cs-story">
      <p
        v-for="p in study.paras"
        :key="p"
      >{{ $t(p) }}</p>
    </div>

    <h2 class="cs-h2">{{ $t('cs_shots') }}</h2>
    <div class="cs-shots">
      <img
        v-for="s in shots"
        :key="s"
        :src="s"
        :alt="study.name"
        loading="lazy"
      />
    </div>
  </PageShell>
</template>

<script>
import { useI18n } from "vue-i18n";
import PageShell from "./PageShell.vue";
import { ICONS } from "./bp-shared";
import { STUDIES } from "../case-studies";

export default {
  name: "CaseStudy",
  components: { PageShell },
  setup() {
    const { locale } = useI18n();
    return { locale };
  },
  data() {
    return { ICONS };
  },
  computed: {
    study() {
      return STUDIES[this.$route.params.slug];
    },
    shots() {
      return this.study ? this.study.shots(this.locale) : [];
    },
  },
  mounted() {
    if (!this.study) this.$router.replace("/");
  },
};
</script>

<style>
.bp .cs-h2 {
  font-family: "Archivo";
  font-weight: 900;
  font-size: 22px;
  letter-spacing: -0.01em;
  margin: 38px 0 16px;
}
.bp .cs-facts {
  max-width: 900px;
}
.bp .cs-story p {
  max-width: 72ch;
  font-size: 15.5px;
}
.bp .cs-shots {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  max-width: 900px;
}
.bp .cs-shots img {
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--line);
}
@media (max-width: 700px) {
  .bp .cs-shots {
    grid-template-columns: 1fr;
  }
}
</style>
