<template>
  <PageShell>
    <div class="pg-head">
      <div class="sec-tag">{{ $t('nav_tools') }}</div>
      <h1><span class="hl">Snowflake</span> Proxy</h1>
      <p class="lead">{{ $t('sf_lead') }}</p>
    </div>
    <div class="pg-grid">
      <div class="pg-art">
        <a
          href="https://snowflake.torproject.org/"
          target="_blank"
          rel="noopener"
          aria-label="Tor Project · Snowflake"
        ><img
          src="/Tor.png"
          alt="Tor Project logo"
          style="max-height: 150px"
        /></a>
      </div>
      <div class="pg-copy">
        <p>{{ $t('sf_p1') }}</p>
        <p>{{ $t('sf_p2') }}</p>
        <div class="pg-frame">
          <iframe
            title="Snowflake proxy widget"
            src="https://snowflake.torproject.org/embed.html"
            width="320"
            height="240"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div class="pg-actions">
          <a
            class="btn btn-ghost"
            href="https://snowflake.torproject.org/"
            target="_blank"
            rel="noopener"
          ><span
            class="ico"
            v-html="ICONS.external"
          ></span>snowflake.torproject.org</a>
        </div>
      </div>
    </div>
  </PageShell>
</template>

<script>
import PageShell from "./PageShell.vue";
import { ICONS } from "./bp-shared";

export default {
  name: "SnowFlake",
  components: { PageShell },
  data() {
    return { ICONS };
  },
};
</script>
