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
          <v-divider class="ma-6"></v-divider>
          <div style="display: flex; flex-direction: column; width: 100%">
            <p
              class="paragraphWidth"
              style="align-self: center; text-align: left"
            >
              The Snowflake Project by Tor enables users to access censored
              websites and apps, similar to VPNs. It disguises internet
              activity, making it hard for censors to detect. Snowflake is
              integrated into apps like Tor Browser, Onion Browser, and Orbot,
              and operates through volunteer-run proxies. Users can also run
              their own Snowflake proxy. If users encounter issues, they can
              seek support through the Tor Project's support channels or report
              bugs via GitLab or an anonymous ticket. Snowflake is part of the
              Pluggable Transports family and is continuously being improved.
            </p>
            <br />
            <p>
              To know more about the Snowflake, press the
              <span style="color: rgb(170, 7, 162); font-weight: bold"
                >Tor</span
              >
              icon above
            </p>
          </div>
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
          <v-divider class="ma-6"></v-divider>
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

<style scoped>
.paragraphWidth {
  width: 60%;
}
@media (max-width: 600px) {
  .paragraphWidth {
    width: 90%;
  }
}
</style>

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
