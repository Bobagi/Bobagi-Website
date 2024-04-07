<template>
  <v-row>
    <v-col>
      <v-row
        class="row-flex d-flex text-center image-p"
        style="gap: 10px; align-content: center"
      >
        <v-col
          id="imageColumn"
          cols="4"
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
        src: "https://lh3.googleusercontent.com/pw/AP1GczMnl2rMlMRBQqwAaDkOOxOyf-DwHhw8-bYdx5egJbQ9kyEXhZHOlMqHzGu6Zt1GDHYOOldgBj2CPJ3KNeOxtEhnDq-G3KUgNCamjt3gKwRXUDpu0AXa0nlaA62XCAQCLJ3ic0hpuJSEeU_F0z3bBczrnzA7lLc3Hz-iUK11uwyUzmVtmyE2W9HDSuRSjo5o-rg2wtBwL8LlglVw0Tcls2HfCHo2d-JPrhZ2oGKZZ9d_RuNx2lHli2y2CJJHG0Qw--uisGuDogq7DOnwRDb9z-8hQnPNNNHInWtbfRPZM-DFi9MTyDgf2MloESgV89LtYTUvLJJiHsuIaAfpj2eBgqBkB7UD4v1irW6Tl_50J0Mn-SW7oQRVDU-77y7N6sDODZvriFpFkA_c9oK4QqRc6f04YidaA17oI0D1Rjn_JiLGzO5lg9bzYU9cE2SZgi9zvZ_44sxQhyYpZXSFKp8kdV1f34Wpen5PruhQiW8yXbw4I1AjX2djtEO_BW06wvvi9MCoRmFJlrILumP3Cygj456KCWmy-Ol8yZYEFZFzsw_RapcVXP_JwiCjyFnQvPVQBf85S9P1ZYKQwss-cfqvSXpzYtELVoCG-KYbm0FBs43et_g2iobMKs5EpuRD3TdmBRszmgk7lDCt0n1uzWVrjuP5fM5img9FieiTk2ShSm57jNR9EEfnQxrZqhfhwdNURigjhWGnsh1c1wXA2y3_xqZoTlcCiaMLALSVaMsTAlVVFAvVA5Hi2rEQYAyniYfvFhmdl19F--_JfxqMYepVgm9xd2jNc2uS2NKS4HJk0VAwrLd-ZPzOrXReKmsRqec9Dy2QcCynY1bbnvoyrEkNhRXg8Jy_on5ONYNNdOSKaNZ0S49Z2L0oHQkQxaoVnRHqO_6HPTc9t7JgfdmT1UNutWcuVQ=w479-h639-s-no-gm?authuser=0",
      },
      {
        src: "https://lh3.googleusercontent.com/pw/AP1GczPqsmqWYhlB-JKDQF84YrxFa9BS2brLkY0VdGQQ5MzGEyC7T2w252Td_pQAmQKwmRvk0hctH5zG5vF3LHO7HC_VDArY3AxRSkm592MqQWKN6QFta3481b4dM0E5mcUBwE1CbGxOjRjhxttHypOa72AQ1v_ePSh4R7PD2Rr78h5BCKlEfgsEiR9aivrVOyAIK9wNYNNTruaSbZaS6y9VcQ00xwpDNcQFWhusa_sYe-tuMn6vp_D0BIkeHqabMzsFfG181DUcid330-vtb5P0gziRi9CeKKXgPJvG9Nl6_EZVOGMJLZatzTzNwB480JtJ4V4T-a59wpEH4wVV1is7dGAF57Bl0jmU6bEgJCQcN_j1rpICgT-fDlXeqbhOmHW1vV4clRB3DhczMLp1m0jYD8LxudTnRfD3Ndd3Lq9nbL3h2g5TIRTvUbzh1lmLW_vm9OTy0JH0YdSm8f_bp1dY94b8EAHxUU4bidq50nvE8JafmiUmIr-iCZQfRNS487c6oqg-5qnmzyC2tAZUx8TSgggxROsH7BEGZ_p-T3xq71M21Ls4My-hzeUaYyvzDdGGY5F-4IUiAq8GWW5nOHdv_Y6lVB53_bOV0Y8dnYO043qo7ZhonB11_MLHEyc6OYF_tfDLQmPDLPeef2pHnR3B1GczABlPWxPoCOkTDnQV6zmv8RxvbCyVb3Ojpu_zY4c856y1hDma6SBmGUhaSGvcI9-76hbqFlxQ9sdjS5X3hVTN2o86Arju4WGGsNnFTXMyMcmRU_FN3_OQ92eoSmUVLTwJP5vWdvUeJIxDqPWcuSswbEVvYW_MTpfnI_DazGTzb__GPFX3wPr6N8aJzKONhNrH3qMSG6HX-Kfcg8hT3AyVIMZ5XPPxvs9qni5w3em0XiapPxt3DWx8bbcuev2zQu2dIw=w479-h639-s-no-gm?authuser=0",
      },
    ],
  }),
};
</script>
