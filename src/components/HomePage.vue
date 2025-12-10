<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center px-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2">
          {{ $t('greeting') }} <span class="emoji-wave">👋</span>
        </h1>

        <p class="text-subtitle-1 mb-4">
          {{ $t('introduction') }}
        </p>

        <p class="text-subtitle-2 mb-6">
          {{ $t('currentlyLearning') }}
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
            {{ $t('buyCoffee') }}
          </v-btn>

          <v-btn
            color="primary"
            variant="outlined"
            @click="copyEmail"
          >
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              {{ $t('copyClipboard') }}
            </v-tooltip>
            <v-icon
              start
              icon="mdi-email"
            ></v-icon>
            {{ $t('contactMe') }}
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
            {{ $t('github') }}
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
            {{ $t('linkedin') }}
          </v-btn>
        </div>

        <p class="mt-6 text-caption">
          <i>{{ $t('replyNote') }}</i>
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
        alert(this.$t("emailCopied"));
      } catch (err) {
        alert(this.$t("copyFailed"));
      }
    },
  },
};
</script>

