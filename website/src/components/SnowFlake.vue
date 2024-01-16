<template>
  <div class="fill-height" style="padding: 0">
    <v-responsive class="align-center text-center fill-height primaryRadial">
      <div class="containerContent">
        <div class="panelContent">
          <a href="https://snowflake.torproject.org/" target="_blank"
            ><v-img
              src="../../public/Tor.png"
              height="100"
              class="logo purple-shadow"
              alt="Tor Project logo"
              style="margin-bottom: 10px"
          /></a>
          <v-divider class="my-4"></v-divider>
          <p>
            To know more about the Snowflake, press the
            <span style="color: rgb(170, 7, 162); font-weight: bold">Tor</span>
            icon above
          </p>
          <br />
          <v-progress-circular
            v-if="iframeLoading"
            indeterminate
            color="purple"
            :size="100"
          ></v-progress-circular>

          <!-- Iframe -->
          <iframe
            v-show="!iframeLoading"
            src="https://snowflake.torproject.org/embed.html"
            width="320"
            height="240"
            frameborder="0"
            scrolling="no"
            @load="iframeLoading = false"
          ></iframe>
          <v-divider class="my-4"></v-divider>
          <v-row class="d-flex align-center justify-center">
            <v-col cols="auto">
              <v-btn
                color="purple"
                size="large"
                variant="flat"
                :to="{ name: 'HomePage' }"
              >
                <v-icon icon="mdi-home" size="large" start></v-icon>
                Home
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-responsive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframeLoading: true, // Initially set to true
    };
  },
};
</script>

<style scoped>
.purple-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(216, 12, 216));
}
</style>
