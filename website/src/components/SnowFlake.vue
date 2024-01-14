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
          <iframe
            src="https://snowflake.torproject.org/embed.html"
            width="320"
            height="240"
            frameborder="0"
            scrolling="no"
          ></iframe>
          <v-row class="d-flex align-center justify-center">
            <v-col cols="auto">
              <v-btn
                color="primary"
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
.purple-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(216, 12, 216));
}
</style>
