<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1><span class="primary-color">Tic</span> Tac Toe</h1>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row class="text-center">
      <v-col style="justify-content: space-around">
        <v-btn color="primary" @click="handleButtonClick">
          {{
            connected ? "Disconnect" : awaitingPlayer ? "Exit queue" : "Play"
          }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center" style="justify-content: center">
      <v-col class="pa-0">
        <div
          v-if="connected && opponent"
          style="display: flex; justify-content: space-around"
        >
          <span
            id="spanOpponent"
            v-if="connected && opponent"
            class="ml-3 mr-3"
          >
            You're opponent is: {{ opponent }}
          </span>
          <div>
            <span id="spanTimeRemaining"
              >{{ turnText }} - {{ turnTime }} s</span
            >
            <br />
            <span id="yourSymbol">Your symbol is: {{ symbol }}</span>
          </div>
        </div>

        <span
          id="spanAwaitingPlayer"
          v-if="awaitingPlayer"
          style="align-self: center; margin-right: 10px"
          >Looking for an opponent</span
        >
        <v-progress-circular
          v-if="awaitingPlayer"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row class="text-center" style="justify-content: space-around"
      ><v-col cols="12" md="6" class="pa-0">
        <v-row v-if="connected" class="ma-5">
          <v-col
            v-for="(cell, index) in cells"
            :key="index"
            class="tic-tac-toe-cell"
            :class="{ 'cell-x': cell === 'X', 'cell-o': cell === 'O' }"
            cols="4"
            @click="makeMove(index)"
          >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col class="d-flex flex-column">
        <h2>Statistics:</h2>
        <span class="ml-3 mr-3">Played Matches: {{ totalMatches }}</span>
        <span class="ml-3 mr-3">Winnings: {{ totalWinnings }}</span>
        <span class="ml-3 mr-3"
          >Loses: {{ parseInt(totalMatches) - parseInt(totalWinnings) }}</span
        >
      </v-col>
      <v-col v-if="connected && opponent" class="d-flex flex-column">
        <h2>Against {{ opponent }}:</h2>
        <span class="ml-3 mr-3">Played Matches: {{ totalMatchesAgainst }}</span>
        <span class="ml-3 mr-3">Winnings: {{ totalWinningsAgainst }}</span>
        <span class="ml-3 mr-3"
          >Loses:
          {{
            parseInt(totalMatchesAgainst) - parseInt(totalWinningsAgainst)
          }}</span
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.tic-tac-toe-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}
.tic-tac-toe-cell {
  border: 1px solid #000;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  background-color: rgb(var(--v-theme-background));
  position: relative;
  border: none;
}

.tic-tac-toe-cell:nth-child(-n + 9):not(:nth-child(3n)) {
  border-right: 2px solid rgb(var(--v-theme-contentbg)); /* Right border for the first two cells in the first two rows */
}
.tic-tac-toe-cell:nth-child(-n + 6) {
  border-bottom: 2px solid rgb(var(--v-theme-contentbg)); /* Bottom border for the first two rows */
}

.cell-x::before,
.cell-o::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  color: rgb(var(--v-theme-primary));
}

.cell-x::before {
  content: "X";
  /* Style for X */
}

.cell-o::before {
  content: "O";
  /* Style for O */
}
</style>

<script>
import { mapState } from "vuex";
import io from "socket.io-client";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  name: "TicTacToe",
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
      turnTime: 20,
      timerInterval: null,
      startTime: null,
      endTime: null,
      totalMatches: 0,
      totalWinnings: 0,
      totalMatchesAgainst: 0,
      totalWinningsAgainst: 0,
    };
  },
  watch: {
    myTurn() {
      this.resetAndStartTimer();
    },
  },
  computed: {
    ...mapState(["user"]),
    turnText() {
      return this.myTurn ? "Your Turn" : "Opponent's Turn";
    },
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

          this.resetAndStartTimer();
          this.getStatisticsAgainst(match.opponentId);
        });

        this.socket.on("moveMade", (move) => {
          this.cells[move.index] = move.symbol;
          this.myTurn = move.symbol !== this.symbol; // Toggle turn
        });

        this.socket.on("invalidMove", (message) => {
          this.showSnackbar(message);
        });

        this.socket.on("moveTimeout", this.handleMoveTimeout);

        this.socket.on("gameOver", (data) => {
          this.disconnectFromGame();
          if (data.winner) {
            this.showSnackbar("You WON!!!!!");
          } else {
            this.showSnackbar("You lost.");
          }
        });

        this.socket.on("draw", () => {
          this.disconnectFromGame();
          this.showSnackbar("It's a draw");
        });

        this.socket.on("opponentDisconnected", () => {
          this.disconnectFromGame(); // Disconnect the current player as well
          this.showSnackbar("Your opponent has disconnected.");
        });
      }
    },
    disconnectFromGame() {
      this.clearTimer();
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
    handleMoveTimeout() {
      this.resetAndStartTimer();

      if (this.myTurn) {
        this.showSnackbar("Your time ended, you lost your turn.");
      } else {
        this.showSnackbar(
          "Your opponent ran out of time. It's your turn again."
        );
      }
      this.myTurn = !this.myTurn;
    },

    resetAndStartTimer() {
      this.turnTime = 20;
      const currentTime = Date.now();
      this.startTime = currentTime;
      this.endTime = currentTime + 20000; // 20 seconds from now

      this.clearTimer();
      this.timerInterval = setInterval(() => {
        const now = Date.now();
        if (now < this.endTime) {
          this.turnTime = Math.ceil((this.endTime - now) / 1000);
        } else {
          this.clearTimer();
          // Handle timeout logic here
        }
      }, 1000); // Update every second
    },
    clearTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.turnTime = 20;
      }
    },
    showSnackbar(message) {
      this.$store.dispatch("showSnackbar", message);
    },
    async getStatistics() {
      try {
        const response = await axios.get("/api/tictactoe/statistics", {
          params: {
            id: this.user.id,
          },
        });
        this.totalMatches = response.data.totalMatches;
        this.totalWinnings = response.data.totalWinnings;
      } catch (error) {
        if (error.response) {
          alert("Failed to get statistics.");
        } else {
          // Handle other kinds of errors
          alert("Error to get statistics.");
        }
      }
    },
    async getStatisticsAgainst(opponentId) {
      try {
        const response = await axios.get("/api/tictactoe/statisticsagainst", {
          params: {
            id: this.user.id,
            opponentId: opponentId,
          },
        });
        this.totalMatchesAgainst = response.data.totalMatches;
        this.totalWinningsAgainst = response.data.totalWinnings;
      } catch (error) {
        if (error.response) {
          alert("Failed to get statistics against opponent.");
        } else {
          // Handle other kinds of errors
          alert("Error to get statistics against opponent.");
        }
      }
    },
  },
  created() {
    if (!this.user) {
      alert("Do the Sign In before access that page.");
      this.$router.push("/SignIn?origin=TicTacToe");
      return;
    }
    this.getStatistics();
  },
  beforeUnmount() {
    this.clearTimer(); // Clear the timer when the component is destroyed
  },
};
</script>
