<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" style="justify-content: space-around">
        <span id="spanPlayer" v-if="connected" class="ml-3 mr-3">{{
          user.username
        }}</span>
        <v-btn
          color="primary"
          @click="connected ? disconnectFromGame() : connectToGame()"
        >
          {{ connected ? "Disconnect" : "Play Tic Tac Toe" }}
        </v-btn>
        <span id="spanOpponent" v-if="connected && opponent" class="ml-3 mr-3">
          {{ opponent }}
        </span>
      </v-col>
    </v-row>
    <v-row class="text-center" style="justify-content: center">
      <span id="spanWhoTurn" v-if="connected && opponent">{{ turnText }}</span>
    </v-row>
    <v-row class="text-center" style="justify-content: space-around"
      ><v-col cols="12" md="6">
        <v-row v-if="connected" class="mt-5">
          <v-col
            cols="4"
            v-for="(cell, index) in cells"
            :key="index"
            class="tic-tac-toe-cell"
            @click="makeMove(index)"
          >
            {{ cell }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.tic-tac-toe-cell {
  border: 1px solid #000;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
}
</style>

<script>
import { mapState } from "vuex";
import io from "socket.io-client";

export default {
  name: "TicTacToe",
  computed: {
    ...mapState(["user"]),
    turnText() {
      return this.myTurn ? "Your Turn" : "Opponent's Turn";
    },
  },
  data() {
    return {
      socket: null,
      connected: false,
      opponent: null,
      symbol: null,
      myTurn: false,
      cells: Array(9).fill(""),
    };
  },
  methods: {
    connectToGame() {
      console.log(
        "Attempting to connect to game server at:",
        process.env.VUE_APP_API_URL
      );
      if (!this.socket) {
        this.socket = io(process.env.VUE_APP_API_URL);
        this.socket.on("connect", () => {
          console.log("Connected to server");
          this.socket.emit("findMatch", { username: this.user.username });
        });

        this.socket.on("connect_error", (error) => {
          console.error("Connection error:", error);
        });

        this.socket.on("connect_timeout", (timeout) => {
          console.error("Connection timeout:", timeout);
        });

        this.socket.on("matchFound", (opponentUsername) => {
          this.opponent = opponentUsername;
          this.connected = true;
        });

        this.socket.on("gameStart", (symbol) => {
          this.symbol = symbol;
          this.myTurn = symbol === "X"; // 'X' starts the game
        });

        this.socket.on("moveMade", (move) => {
          this.cells[move.index] = move.symbol;
          this.myTurn = move.symbol !== this.symbol; // Toggle turn
        });

        this.socket.on("opponentDisconnected", () => {
          this.disconnectFromGame(); // Disconnect the current player as well
          alert("Your opponent has disconnected.");
        });
      } else {
        console.log("Socket already exists");
      }
    },
    disconnectFromGame() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
        this.connected = false;
        this.cells = Array(9).fill(""); // Reset the game board
        console.log("Disconnected from server");
      }
    },
    makeMove(index) {
      if (this.myTurn && !this.cells[index]) {
        this.cells[index] = this.symbol;
        this.socket.emit("makeMove", { index, symbol: this.symbol });
        this.myTurn = false;
      }
    },
  },
  created() {
    if (!this.user) {
      alert("Do the Sign In before access that page.");
      this.$router.push("/SignIn");
    }
  },
};
</script>
