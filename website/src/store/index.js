// store/index.js
import { createStore } from "vuex";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default createStore({
  state: {
    user: null,
    token: null,
    snackbar: {
      show: false,
      message: "",
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setSnackbar(state, payload) {
      state.snackbar.show = payload.show;
      state.snackbar.message = payload.message;
    },
  },
  actions: {
    showSnackbar({ commit }, message) {
      commit("setSnackbar", { show: true, message });
    },
    hideSnackbar({ commit }) {
      commit("setSnackbar", { show: false, message: "" });
    },
    login({ commit }, { user, token }) {
      commit("setUser", user);
      commit("setToken", token);
      localStorage.setItem("userToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
    },
    async registerUser(
      { commit },
      { email, username, password, confirmPassword }
    ) {
      try {
        const response = await axios.post("/api/register", {
          email,
          username,
          password,
          confirmPassword,
        });
        if (response.status === 201) {
          commit("setUser", response.data.user);
          commit("setToken", response.data.token);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
          return true; // Indicate success
        } else {
          return false; // Indicate failure
        }
      } catch (error) {
        console.error("Registration error:", error);
        return false;
      }
    },
    async submitNicknameAction({ commit }, { email, username, sub }) {
      try {
        const response = await axios.post("/api/register-google-user", {
          email,
          username,
          sub,
        });
        if (response.status === 201) {
          commit("setUser", response.data.user);
          commit("setToken", response.data.token);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
          return true; // Indicate success
        } else {
          return false; // Indicate failure
        }
      } catch (error) {
        console.error("Error submitting nickname:", error);
        return false;
      }
    },
    checkTokenValidity({ state, dispatch }) {
      const token = state.token || localStorage.getItem("userToken");
      if (!token) {
        return;
      } else if (token.split(".").length !== 3) {
        // Handle cases where the token is not available, is empty, or is not in the correct format
        console.error("Invalid or missing token");
        // Perform necessary actions (e.g., redirect to login)
      } else {
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            // console.log("Decoded token: ", decodedToken);

            // const expirationDate = new Date(decodedToken.exp * 1000);
            // console.log("Token will expire at: ", expirationDate.toString());

            const isTokenExpired = decodedToken.exp < Date.now() / 1000;
            if (isTokenExpired) {
              dispatch("logout");
            }
          } catch (error) {
            console.error("Error decoding token:", error);
            dispatch("logout");
          }
        }
      }
    },
    // More actions...
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
