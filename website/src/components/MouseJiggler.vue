<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <div>
            <h1><span class="primary-color">Mouse</span> Jiggler</h1>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col cols="12" md="5" style="text-align: center">
            <v-img
              :src="imagePath"
              class="logo"
              style="max-height: 20em"
              alt="The image features a stylized computer mouse on an abstract background with swirls and motion lines, using a palette of cream, gold, brown, and soft greens, ideal for a mouse jiggler app icon."
            />
          </v-col>
          <v-col cols="12" md="7">
            <div style="text-align: left; align-self: center">
              <label>
                Mouse Jiggler is an application designed to simulate mouse
                movement, preventing your computer from entering sleep mode or
                screen lock while you are away. It is useful for keeping
                sessions active without manual intervention.
              </label>
              <br /><br />
              <label style="font-style: italic">
                To use the full functionalities, you may need to adjust your
                system settings.
              </label>
              <br /><br />
              <label>
                For more details, please visit the GitHub repository page.
              </label>
            </div>
            <div class="download-links" style="margin-top: 20px">
              <v-container>
                <v-row>
                  <v-col class="download-buttons-col">
                    <v-btn
                      color="primary"
                      size="large"
                      variant="outlined"
                      :href="`${downloadPath}/mouse-jiggler-linux.zip`"
                      download
                    >
                      <v-icon icon="mdi-linux" size="large" start></v-icon>
                      Linux
                    </v-btn>
                    <br />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-alert dense text color="primary" type="info">
                      This Linux executable is intended for ARM64 architecture
                      and may require certain libraries. Please ensure your
                      system meets these requirements.
                    </v-alert>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="download-buttons-col">
                    <v-btn
                      color="primary"
                      size="large"
                      variant="outlined"
                      :href="`${downloadPath}/mouse-jiggler-macos.zip`"
                      download
                    >
                      <v-icon icon="mdi-apple" size="large" start></v-icon>
                      MacOS
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-alert dense text color="primary" type="info">
                      This app is designed for MacOS with ARM architecture. If
                      you are using an Intel-based Mac, you might need to enable
                      Rosetta 2.
                    </v-alert>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="download-buttons-col">
                    <v-btn
                      color="primary"
                      size="large"
                      variant="outlined"
                      :href="`${downloadPath}/mouse-jiggler-win.exe`"
                      download
                    >
                      <v-icon
                        icon="mdi-microsoft-windows"
                        size="large"
                        start
                      ></v-icon>
                      Windows
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-alert dense text color="primary" type="info">
                      This Windows executable is for ARM64 systems. Ensure
                      compatibility or necessary emulation on non-ARM systems.
                    </v-alert>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-col>
        </v-row>
        <v-divider class="ma-6"></v-divider>
        <v-row justify="center">
          <v-col cols="12">
            <div class="d-flex flex-wrap ga-3 justify-center">
              <v-btn
                color="primary"
                size="large"
                variant="flat"
                :to="{ name: 'HomePage' }"
              >
                <v-icon icon="mdi-home" size="large" start></v-icon>
                Home
              </v-btn>
              <v-btn
                color="primary"
                size="large"
                variant="flat"
                href="https://github.com/Bobagi/Avarice"
                target="_blank"
              >
                <v-icon icon="mdi-github" size="large" start></v-icon>
                GitHub
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MouseJiggler',
  mounted() {
    console.log(process.env)
    console.log('VUE_APP_IMAGES_PATH::', process.env.VUE_APP_IMAGES_PATH)
  },
  computed: {
    imagePath() {
      return `${process.env.VUE_APP_IMAGES_PATH}mouseJigglerIcon.jpg`
    },
    downloadPath() {
      return process.env.VUE_APP_DOWNLOAD_PATH
    },
  },
}
</script>

<style scoped>
.orange-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(216, 128, 12));
}

.download-buttons-col {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
