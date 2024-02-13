<template>
  <v-row class="text-center">
    <v-col cols="4">
      <v-img
        src="https://lh3.googleusercontent.com/a/ACg8ocJjYITqpegPaqpmsUs_Bxulob9iIARV1BMTL_tLf460MLgO=s288-c-no"
        class="my-3 rounded-shaped"
      ></v-img>
    </v-col>

    <v-col class="mb-4">
      <div style="display: flex; gap: 30px; margin: 25px 0px">
        <label
          id="personalDescription"
          style="word-wrap: break-word; max-width: 440px; text-align: left"
        >
          Hello 👋<br />
          My name is Gustavo, and I'm a Brazilian programmer who quit his job to
          explore different areas of development and figure out the next steps
          in life.
          <br /><br />
          🌱 Currently, I am focusing on learning Python, Linux, and Vue.
          <br /><br />
          Buy me a coffee ☕❤️
          <a
            href="https://www.paypal.com/donate?business=gustavoperin067%40gmail.com&item_name=Support+Gustavo's+Journey&currency_code=USD"
            target="_blank"
            >Donate with PayPal</a
          >
          <br /><br />
          Contact 📫:<br />
          Feedback, ideas, or anything else you'd like to share:
          <a href="mailto:gustavoperin067@gmail.com"
            >gustavoperin067@gmail.com</a
          >
        </label>
      </div>
      <v-row class="d-flex align-center">
        <v-col
          class="d-flex align-center justify-center"
          style="gap: 20px"
          cols="auto"
        >
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
            Linkdin
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HomePage",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader/tree/next",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify/tree/next",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Roadmap",
        href: "https://vuetifyjs.com/introduction/roadmap/",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
};
</script>
