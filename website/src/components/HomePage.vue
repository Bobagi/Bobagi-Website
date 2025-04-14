<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center px-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2">
          Hello there <span class="emoji-wave">👋</span>
        </h1>

        <p class="text-subtitle-1 mb-4">
          I'm <strong>Gustavo</strong>, a Brazilian software developer passionate about building cool stuff with
          <span class="font-italic">Python, Node, C#, Next</span> and <span class="font-italic">Vue</span>.
        </p>

        <p class="text-subtitle-2 mb-6">
          Currently learning, exploring, and sharing ideas.
        </p>

        <div class="d-flex flex-wrap justify-center ga-4 mb-5">
          <v-btn
            color="primary"
            variant="flat"
            href="https://www.paypal.com/donate?business=gustavoperin067%40gmail.com&item_name=Support+Gustavo's+Journey&currency_code=USD"
            target="_blank"
          >
            <v-icon
              start
              icon="mdi-coffee"
            ></v-icon>
            Buy me a coffee
          </v-btn>

          <v-btn
            color="primary"
            variant="outlined"
            href="mailto:gustavoperin067@gmail.com"
            @click="copyEmail"
          >
            <v-tooltip
              activator="parent"
              location="bottom"
            >Click to copy email</v-tooltip>
            <v-icon
              start
              icon="mdi-email"
            ></v-icon>
            Contact me
          </v-btn>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="d-flex justify-center flex-wrap ga-4">
          <v-btn
            size="large"
            color="black"
            variant="flat"
            href="https://github.com/Bobagi/"
            target="_blank"
          >
            <v-icon
              start
              icon="mdi-github"
            ></v-icon>
            GitHub
          </v-btn>

          <v-btn
            size="large"
            color="indigo"
            variant="flat"
            href="https://www.linkedin.com/in/gustavoaperin/"
            target="_blank"
          >
            <v-icon
              start
              icon="mdi-linkedin"
            ></v-icon>
            LinkedIn
          </v-btn>
        </div>

        <p class="mt-6 text-caption">
          <i>(Replies might take a while... or forever — but hey, worth the try 😄)</i>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  40% {
    transform: rotate(12deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.emoji-wave {
  display: inline-block;
  animation: wave 1.5s infinite ease-in-out;
  transform-origin: 70% 70%;
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.8rem !important;
  }

  .text-subtitle-1,
  .text-subtitle-2 {
    font-size: 1rem !important;
  }

  .v-btn {
    font-size: 0.8rem !important;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  h1 {
    font-size: 2.2rem !important;
  }

  .text-subtitle-1,
  .text-subtitle-2 {
    font-size: 1.1rem !important;
  }

  .v-btn {
    font-size: 0.9rem !important;
  }
}
</style>

<script>
export default {
  name: "HomePage",
  methods: {
    async copyEmail() {
      const email = "gustavoperin067@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        alert("Email copied to clipboard!");
      } catch (err) {
        alert("Failed to copy email");
      }
    },
  },
};
</script>

