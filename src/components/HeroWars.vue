<template>
  <PageShell>
    <div class="pg-head">
      <div class="sec-tag">{{ $t('nav_games') }}</div>
      <h1><span class="hl">API</span> Bot</h1>
      <p class="lead">Hero Wars: Dominion Era</p>
    </div>
    <div class="pg-grid">
      <div class="pg-art">
        <img
          src="/screenshots/herowars.png"
          alt="Hero Wars Bot"
        />
      </div>
      <div class="pg-copy">
        <p>{{ $t('game_desc') }}</p>
        <p>{{ $t('game_how') }}</p>
        <p>{{ $t('game_more') }}</p>
        <div class="pg-note warn">{{ $t('game_warn') }}</div>
        <div class="pg-actions">
          <span
            class="status live"
            style="align-self: center"
          >{{ $t('st_live') }}</span>
          <a
            class="btn btn-dark"
            href="https://herowars.bobagi.space"
            target="_blank"
            rel="noopener"
          >{{ $t('cta_site') }}</a>
        </div>
      </div>
    </div>
  </PageShell>
</template>

<script>
import PageShell from "./PageShell.vue";

export default {
  name: "HeroWars",
  components: { PageShell },
};
</script>
