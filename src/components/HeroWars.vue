<template>
  <PageShell>
    <div class="pg-head">
      <div class="sec-tag">{{ $t('nav_games') }}</div>
      <h1><span class="hl">Auto</span>play Bot</h1>
      <p class="lead">Hero Wars: Dominion Era</p>
    </div>
    <div class="pg-grid">
      <div class="pg-art">
        <img
          src="/Browser_Orion.png"
          alt="Hero Wars bot art"
        />
      </div>
      <div class="pg-copy">
        <p>{{ $t('game_desc') }}</p>
        <p>{{ $t('game_how') }}</p>
        <div class="pg-note warn">{{ $t('game_warn') }}</div>
        <div class="pg-actions">
          <span
            class="status wip"
            style="align-self: center"
          >{{ $t('st_wip') }}</span>
          <a
            class="btn btn-dark"
            href="https://bobagi.net/downloads/dist.7z"
            target="_blank"
            rel="noopener"
          ><span
            class="ico"
            v-html="ICONS.download"
          ></span>{{ $t('cta_download') }}</a>
          <a
            class="btn btn-ghost"
            href="https://github.com/Bobagi/Hero-Wars-Auto-Play-Bot"
            target="_blank"
            rel="noopener"
          ><span
            class="ico"
            v-html="ICONS.github"
          ></span>GitHub</a>
        </div>
      </div>
    </div>
  </PageShell>
</template>

<script>
import PageShell from "./PageShell.vue";
import { ICONS } from "./bp-shared";

export default {
  name: "HeroWars",
  components: { PageShell },
  data() {
    return { ICONS };
  },
};
</script>
