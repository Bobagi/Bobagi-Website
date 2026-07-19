<template>
  <PageShell>
    <div class="pg-head">
      <div class="sec-tag">{{ $t('nav_tools') }}</div>
      <h1><span class="hl">Mouse</span> Jiggler</h1>
      <p class="lead">{{ $t('mj_lead') }}</p>
    </div>
    <div class="pg-grid">
      <div class="pg-art">
        <img
          src="/mouseJigglerIcon.jpg"
          alt="Mouse Jiggler icon"
        />
      </div>
      <div class="pg-copy">
        <p>{{ $t('mj_p1') }}</p>
        <div class="pg-note">{{ $t('mj_arch') }}</div>
        <div class="dl-row">
          <a
            class="btn btn-dark"
            href="/download/mouse-jiggler-win.exe"
            download
          ><span
            class="ico"
            v-html="ICONS.download"
          ></span>Windows (ARM64)</a>
          <a
            class="btn btn-dark"
            href="/download/mouse-jiggler-macos.zip"
            download
          ><span
            class="ico"
            v-html="ICONS.download"
          ></span>macOS (ARM)</a>
          <a
            class="btn btn-dark"
            href="/download/mouse-jiggler-linux.zip"
            download
          ><span
            class="ico"
            v-html="ICONS.download"
          ></span>Linux (ARM64)</a>
        </div>
        <div class="pg-actions">
          <a
            class="btn btn-ghost"
            href="https://github.com/Bobagi/mouse-jiggler"
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
  name: "MouseJiggler",
  components: { PageShell },
  data() {
    return { ICONS };
  },
};
</script>
