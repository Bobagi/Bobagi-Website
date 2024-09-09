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
            <a href="mailto:gustavoperin067@gmail.com">gustavoperin067@gmail.com</a>
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
                  <v-icon
                    icon="mdi-github"
                    size="large"
                    start
                  ></v-icon>
                  GitHub
                </v-btn>
                <v-btn
                  color="primary"
                  size="large"
                  variant="flat"
                  href="https://www.linkedin.com/in/gustavoaperin/"
                  target="_blank"
                >
                  <v-icon
                    icon="mdi-linkedin"
                    size="large"
                    start
                  ></v-icon>
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

@media (min-width: 600px) and (max-width: 960px) {
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
      {
        src: "https://lh3.googleusercontent.com/pw/AP1GczMI7pq8IKtyywIGNbb9FihpKvq2vYUBXZ1uuXvD3IXo1-sssM7N9U00aq5Vrvq8THxbCHxImyUSwr-ISj1lRcx_vtk7Zv3tRQ2dJ6fUz5Mopajs4oBmkduTptkgJLOzHT3UHxGK2MT5YPCqEZzTOmJW3cPkhleMtAF5gvTl0Lx9YmZnSgDvVymaJKyId1uibsgPgjj545djrUEnx-Z2p3bLx6unVRByVsqf3fkB6FfhiqYS1EEve6UcCzr3ROQjimp2aSpdjFarzJW5bwmB-McLMEpFLrUdnQcn5aV2eSp-91XAA8p-A-5DbxAV0XR_wfNB1HA9lFxP_JHclL8Y_Wrlj94g3p-YVIfycz9Cixs1zi_LSZBy3B6eYCSnn0fpJnr7cWeJxsU1sAiFMYo4ChuQL5wGbx-Z3XqCD3qf3qO80DeVQdESgUuri7PFV5GMiJ6CUawV7YKhjUVeWy1hWGyb3BBfXw4eDNbna2Ij7VYgfg7vlgl1J7bhoWJTBA53WNY5QGEoOk42DBL1rPfcpjwT3P1AFoZgwcADPkOMY8kplLsDW-97zaXBuWI4cu05AxjMVp8iDrF0oefStvlkNwwxArk_lzGm5JNW8wEJMbw7CiWHCAHFZqKPGj7iG5y72jvt7B40smI6yBQXOX_C2AfjhFdIaqYCv7scEk09JYgkptAL7H2UAevZBJt7xVEOH3eUsNomhDZb8yiPlotZNEYf09CFkhtOsCwPxxxBQ6dmwwo1xM_V3ly-v1npJ96bIa_lbah54dMhnnyPgqrmeWwO045GAhbv3L6_Y8FB5UI8D5K4EogGjadRX9FETCNqaXLCeOq11oe5JYKi49lCptYeLIqqUiKxQhdLIXVsMAp5jMsLy2t73RFQofZiTva6-CHkQngnoDYVblKbcgl_z4buJ70=w1277-h958-s-no-gm?authuser=0",
      },
      {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOL3NZ8DBiD60lGHCJbWI0GS-y_YDGayYYmkpLSJ9JD2mNWrK9QGdbJ8QQQf1F1Z2TLrETZ8IMV_Qr3JbE1P7yOlNtl3wMmRvnrZ3LV9BNXYeTRSEX61fxSLhM5xHcjl_T-xBRtKP4GkjF3P57meH_knIvodcWfL4XAo-UxVQEuOxRjdFz9GUgm6vgjbAoyIJRFz2uzp8tm4zFNSt_PSo_5kaOvXGbBPc_uw8ZJoXf0Wlzfn2tDELzI9g4DUaavYJFNR6l93_-UGiPjb3MxzVWP2jveNd4Q9t4kl9qhx5qsSHZxE90BNGCjAj0StNs1e78gnJLZrZq_PjXD1b0ZzMizkyqOX7UYUbSFvqVJNh4F1oNS-8wdE8osCsfmz6_nbyTzDmUEX2uhHgUMqYuWQjA2nO-4_khXrPDmwNk35AUk-SADgVFDiFotCLrO8ALSrO3ra2wznNePqW-64Sn1gJdRlcWFhZR3pVybtecczMYmeFSuNhKa2sk4U3QgoeoystknVB4ffGn7xjV3HxFw1hQ7GsqV9wcUdNhLw7qk1TFxIxg0fepJMzg9EammSxKTJl_mNh0uddOqCsGP0jOb3uWavyYUFxIA46BQV0t7PzOi10xXDjTI8vzYDufIvTZ_LAY8BMCsGIdl6ppKkNPLCot208qElf7hgABILuFg_Zhel9Hf-tKMZWA0KxTujeqZANjFPxdO1cksi3ApyUzA2GJVNlIfweJim0L3ZRRl4cFdS9KhabTof-9VEsWhWNvxIV7RTkSCRSw-r0fNrNqn2GVXQWSygJY2jkfHrNJntqUa_zCpbYY4JbySTT1PARj8z6kHW7wMskDo9ATb80nimA4ZveEQgiYPvSOd4Fk-yqc0tYXrtOVWH0Sa_O4dgFcT60cPymITpPfVHv5ER2z6-JcRVmI=w766-h958-s-no-gm?authuser=0",
      },
    ],
  }),
};
</script>
