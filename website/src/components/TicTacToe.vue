<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" style="justify-content: space-around">
        <span id="spanPlayer" v-if="connected" class="ml-3 mr-3">{{
          user.username
        }}</span>
        <v-btn color="primary" @click="handleButtonClick">
          {{
            connected
              ? "Disconnect"
              : awaitingPlayer
              ? "Cancel"
              : "Play Tic Tac Toe"
          }}
        </v-btn>
        <span id="spanOpponent" v-if="connected && opponent" class="ml-3 mr-3">
          {{ opponent }}
        </span>
      </v-col>
    </v-row>
    <v-row class="text-center" style="justify-content: center">
      <span id="spanWhoTurn" v-if="connected && opponent">{{ turnText }}</span>
      <span
        id="spanAwaitingPlayer"
        v-if="awaitingPlayer"
        style="align-self: center; margin-right: 10px"
        >Awaiting player</span
      >
      <v-progress-circular
        v-if="awaitingPlayer"
        indeterminate
        color="primary"
      ></v-progress-circular>
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
      matchId: null,
      socket: null,
      connected: false,
      opponent: null,
      symbol: null,
      myTurn: false,
      awaitingPlayer: false,
      cells: Array(9).fill(""),
    };
  },
  methods: {
    connectToGame() {
      if (!this.socket) {
        this.socket = io(process.env.VUE_APP_API_URL);
        this.socket.on("connect", () => {
          this.awaitingPlayer = true;
          this.socket.emit("joinQueue", {
            userId: this.user.id,
            username: this.user.username,
            email: this.user.email,
          });
        });

        this.socket.on("connect_error", (error) => {
          console.error("Connection error: " + error.message);
          this.socket = null;
        });

        this.socket.on("connect_timeout", (timeout) => {
          console.error("Connection timeout:" + timeout);
          this.socket = null;
        });

        this.socket.on("matchStart", (match) => {
          this.matchId = match.matchId;
          this.opponent = match.opponentUsername;
          this.connected = true;
          this.awaitingPlayer = false;
          this.symbol = match.symbol;
          this.myTurn = this.symbol === "X";
        });

        this.socket.on("moveMade", (move) => {
          this.cells[move.index] = move.symbol;
          this.myTurn = move.symbol !== this.symbol; // Toggle turn
        });

        this.socket.on("invalidMove", (message) => {
          alert(message);
        });

        this.socket.on("gameOver", (data) => {
          this.disconnectFromGame();
          if (data.winner) {
            alert("You WON!!!!!");
          } else {
            alert("You lost.");
          }
        });

        this.socket.on("draw", () => {
          this.disconnectFromGame();
          alert("It's a draw");
        });

        this.socket.on("opponentDisconnected", () => {
          this.disconnectFromGame(); // Disconnect the current player as well
          alert("Your opponent has disconnected.");
        });
      }
    },
    disconnectFromGame() {
      if (this.socket) {
        this.matchId = null;
        this.socket.disconnect();
        this.socket = null;
        this.connected = false;
        this.awaitingPlayer = false;
        this.cells = Array(9).fill(""); // Reset the game board
      }
    },
    makeMove(index) {
      if (this.myTurn && !this.cells[index]) {
        this.cells[index] = this.symbol;

        this.socket.emit("makeMove", {
          matchId: this.matchId,
          userId: this.user.id,
          index: index,
          symbol: this.symbol,
        });
        this.myTurn = false;
      }
    },
    handleButtonClick() {
      if (this.connected || this.awaitingPlayer) {
        this.disconnectFromGame();
      } else {
        this.connectToGame();
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
