<template>
  <v-row>
    <v-col>
      <v-row
        class="row-flex d-flex text-center image-p"
        style="gap: 10px; align-content: center"
      >
        <v-col
          id="imageColumn"
          class="v-col-sm-4"
          style="align-self: center; text-align: -webkit-center"
        >
          <v-carousel
            class="my-3 rounded-shaped"
            style="max-width: 300px"
            height="400"
            cycle
            hide-delimiter-background
            :show-arrows="false"
          >
            <v-carousel-item
              v-for="(image, i) in images"
              :key="i"
              :src="image.src"
              cover
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>

        <v-col
          id="personalColumn"
          cols="8"
          class="textContent"
          style="word-wrap: break-word; text-align: left"
        >
          <v-row class="mb-3">Hello 👋 </v-row>
          <v-row class="mb-3">
            My name is Gustavo, and I'm a Brazilian programmer. I like to
            explore different areas of development and figure out the next steps
            in life.
          </v-row>

          <v-row class="mb-3">
            🌱 Currently, I am focusing on learning Python, Linux, and Vue.
          </v-row>

          <v-row>Buy me a coffee ☕❤️</v-row>
          <v-row class="mb-3">
            <a
              href="https://www.paypal.com/donate?business=gustavoperin067%40gmail.com&item_name=Support+Gustavo's+Journey&currency_code=USD"
              target="_blank"
            >
              Donate with PayPal
            </a>
          </v-row>

          <v-row>Contact 📫:</v-row>
          <v-row>
            Feedback, ideas, or anything else you'd like to share... send me an
            email 😄
          </v-row>
          <v-row class="mb-3">
            <a href="mailto:gustavoperin067@gmail.com"
              >gustavoperin067@gmail.com</a
            >
          </v-row>
          <v-row class="mb-3">
            <span class="betweenLines">
              (The answer may take a bit to happen... maybe never, but have
              faith.)
            </span>
          </v-row>

          <v-row class="d-flex align-center justify-center mb-3">
            <v-col>
              <div class="d-flex flex-wrap ga-3 justify-center">
                <v-btn
                  color="primary"
                  size="large"
                  variant="flat"
                  href="https://github.com/Bobagi/"
                  target="_blank"
                >
                  <v-icon icon="mdi-github" size="large" start></v-icon>
                  GitHub
                </v-btn>
                <v-btn
                  color="primary"
                  size="large"
                  variant="flat"
                  href="https://www.linkedin.com/in/gustavoaperin/"
                  target="_blank"
                >
                  <v-icon icon="mdi-linkedin" size="large" start></v-icon>
                  LinkedIn
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style>
.row-flex {
  display: flex;
  flex-direction: row;
}

.image-p {
  padding-top: 32px !important;
  padding-bottom: 32px !important;
}

.textContent {
  max-width: 50%;
}
@media (max-width: 600px) {
  .row-flex {
    flex-direction: column;
  }

  .image-p {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .textContent {
    max-width: 90%;
  }
}
</style>

<script>
export default {
  name: "HomePage",

  data: () => ({
    images: [
      {
        src: "https://lh3.googleusercontent.com/a/ACg8ocJjYITqpegPaqpmsUs_Bxulob9iIARV1BMTL_tLf460MLgO=s288-c-no",
      },
      {
        src: "https://lh3.googleusercontent.com/pw/AP1GczM-GTuR9dvQvPMKdY06P_NC4nNqiBi4WQmflaKYjieKVw_8s23JmIogK543coZy2tBLhrNjivKWrHfWqJCSvLH0x8HLX2ipP42_3H73Vy9eZSb9oI0Dltnrv_Nv4wNdPjVRfq6F9CGhbs9Vp3Vzki229w=w1290-h1719-s-no-gm",
      },
      {
        src: "https://lh3.googleusercontent.com/pw/AP1GczN0om4BHRpuKDWElogoCOZbKof6Fy28_ZAXhJP1x8JU0aAFPKp31UVUoM7zZBADljX4GCbWt_wuQhCyrIpYr54VJTZE7NuO9fPQXB8vunCeP-2WGI8pBOiSNorYKoY2YAlsQE_rohzkAI5RXKqpVsV_gA=w1290-h1719-s-no",
      },
    ],
  }),
};
</script>
