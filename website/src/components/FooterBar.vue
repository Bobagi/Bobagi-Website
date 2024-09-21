<template>
  <v-footer padless color="background" :elevation="10">
    <v-container fluid>
      <v-row justify="space-between">
        <v-col>
          <p
            class="primary-color default-cursor"
            style="font-weight: bold; font-style: italic"
          >
            &copy; {{ currentYear }} Bobagi. All rights reserved.
          </p>
        </v-col>
        <v-col
          style="padding: 0; gap: 15px; justify-content: right; display: flex"
        >
          <p id="lastUpdatedLabel" class="betweenLines" style="align-self: end" tooltip="45.179.91.168">
            last update: {{ lastCommitDate }}
          </p>
          <a href="https://www.linkedin.com/in/gustavoaperin/" target="_blank">
            <v-img
              :width="50"
              aspect-ratio="16/9"
              cover
              src="/bobagiCursive.png"
              alt="Bobagi wrote in a fancy hand-draw style"
              class="logo"
            ></v-img
          ></a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      lastCommitDate: null,
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  mounted() {
    this.fetchLastCommitDate();
  },
  methods: {
    async fetchLastCommitDate() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Bobagi/Bobagi-Website/commits?sha=main"
        );
        const commits = await response.json();
        if (commits.length > 0) {
          const lastCommitDate = new Date(commits[0].commit.author.date);
          this.lastCommitDate = lastCommitDate.toLocaleDateString("en-US");
        }
      } catch (error) {
        console.error("Error fetching last commit date:", error);
      }
    },
  },
};
</script>
