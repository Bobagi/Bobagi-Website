<template>
  <PageShell>
    <div
      class="pg-head"
      style="text-align: center; margin: 40px auto 0"
    >
      <h1><span class="hl">404</span></h1>
      <p class="lead">{{ $t('nf_title') }}</p>
      <img
        src="/404.png"
        alt=""
        style="max-height: 260px; border-radius: 16px; margin: 26px auto; display: block"
      />
      <p class="lead">{{ $t('nf_sub') }}</p>
    </div>
  </PageShell>
</template>

<script>
import PageShell from "./PageShell.vue";

export default {
  name: "NotFound",
  components: { PageShell },
};
</script>
