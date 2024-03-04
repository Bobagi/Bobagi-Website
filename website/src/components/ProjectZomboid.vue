<template>
  <v-container>
    <v-row>
      <v-col>
        <a
          href="https://store.steampowered.com/app/108600/Project_Zomboid/"
          target="_blank"
        >
          <v-img
            src="../../public/zomboid.png"
            height="100"
            class="logo black-shadow mb-6"
            alt="Project Zomboid logo"
          />
        </a>

        <v-row justify="center">
          <div>
            <h1>
              <span class="primary-color">Zomboid</span> Ubuntu dedicated server
            </h1>
          </div>
        </v-row>

        <v-divider class="ma-6"></v-divider>

        <v-row justify="center">
          <v-col cols="12" md="5" style="text-align: center">
            <img
              src="/programerzombie.png"
              class="logo black-shadow"
              style="max-height: 20em"
              alt="Programmer zombie"
            />
          </v-col>
          <v-col cols="12" md="7">
            <div style="text-align: left; align-self: center">
              <label id="serverDescription" style="text-align: left">
                This server is dedicated to Project Zomboid, running on a Ubuntu
                VPS located in São Paulo, Brazil. It's a casual server created
                for playing with colleagues.
                <br />My server is currently
                <span style="color: red">offline</span>, but you can follow the
                instructions on my GitHub to set up your own. 😊 <br /><br />
                Server Details:
                <ul class="link">
                  <li>
                    <a
                      href="https://www.battlemetrics.com/servers/zomboid/24442372"
                      target="_blank"
                      >BattleMetrics</a
                    >
                  </li>
                  <li>
                    <a href="https://pzservers.com/s/olimpo" target="_blank"
                      >PZ Servers</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.trackyserver.com/server/olimpo-2369912"
                      target="_blank"
                      >TrackyServer</a
                    >
                  </li>
                </ul>
                <br />
                To join the server, please press the button below to reveal the
                password.
              </label>
            </div>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col>
            <div class="d-flex flex-wrap ga-3 justify-center" justify="center">
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
                @click="handleClick"
                color="primary"
                size="large"
                variant="flat"
              >
                <v-icon
                  icon="mdi-lock-open-outline"
                  size="large"
                  start
                ></v-icon>
                Password
              </v-btn>

              <v-btn
                color="primary"
                size="large"
                variant="flat"
                href="https://github.com/Bobagi/Zomboid-Ubuntu-Server"
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

<style scoped>
.black-shadow:hover {
  filter: drop-shadow(0 0 2em rgb(0, 0, 0));
}
.link {
  margin-left: 20px;
}
.link > li > a {
  cursor: pointer; /* Show pointer cursor on hover */
}
.link > li > a:hover {
  color: white;
  transition: 200ms;
}
</style>

<script>
export default {
  methods: {
    handleClick() {
      alert("tusca");
    },
  },
};
</script>
