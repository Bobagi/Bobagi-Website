// store/index.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
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
    // More actions...
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
