<template>
  <v-container>
    <div class="text-center">
      <v-overlay
        v-model="loading"
        :persistent="true"
        class="align-center justify-center"
        ><v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular
      ></v-overlay>
    </div>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">Sign In</h1>
        <v-divider class="my-4"></v-divider>
        <v-form ref="form" v-model="valid" @submit.prevent="signIn">
          <v-text-field
            label="Email or Username"
            prepend-icon="mdi-account-circle"
            v-model="emailOrUsername"
            :rules="emailOrUsernameRules"
            required
          />
          <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
            :rules="passwordRules"
            required
          />
          <div class="text-left" style="margin-bottom: 10px; margin-left: 40px">
            <v-btn
              density="compact"
              variant="text"
              color="primary"
              class="pa-0"
              @click="onForgotPasswordClick"
              >Forgot Password?</v-btn
            >
          </div>
          <v-btn v-if="!loading" color="primary" type="submit">Sign In</v-btn>
          <v-progress-circular
            v-else
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-form>

        <div class="d-flex justify-space-evenly my-4">
          <GoogleLogin
            id="GoogleSign"
            :callback="callbackGoogle"
            @click="loading = true"
          />
        </div>
        <v-divider class="my-4"></v-divider>
        <div style="display: flex; justify-content: center; gap: 5px">
          <p>Don't have an account?</p>
          <v-btn
            class="px-1"
            density="compact"
            variant="text"
            color="primary"
            :to="{ name: 'SignUp' }"
            >Sign Up</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { decodeCredential } from "vue3-google-login";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  name: "SignIn",
  data() {
    return {
      loading: false,
      valid: false,
      emailOrUsername: "",
      password: "",
      emailOrUsernameRules: [
        (v) => {
          const result = !!v || "Email or Username is required";
          return result;
        },
        (v) => {
          const result =
            v.length >= 3 ||
            "Email or Username must be at least 3 characters long";
          return result;
        },
      ],
      passwordRules: [
        (v) => {
          const result = !!v || "Password is required";
          return result;
        },
        (v) => {
          const result =
            v.length >= 6 || "Password must be at least 6 characters";
          return result;
        },
      ],
      callbackGoogle: (response) => {
        this.loading = true;
        this.credential = response.credential;
        this.user = decodeCredential(response.credential);
        this.googleSignIn();
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    onForgotPasswordClick() {
      this.$router.push("/ForgotPassword"); // Example route
    },
    async signIn() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const response = await axios.post("/api/login", {
            emailOrUsername: this.emailOrUsername,
            password: this.password,
          });

          this.login({
            user: response.data.user,
            token: response.data.token,
          });
          this.$router.push("/");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 404) {
              alert("User not found!");
            } else if (error.response.status === 401) {
              alert("Wrong password!");
            }
          } else {
            // Handle other kinds of errors
            console.error("Login error:", error);
            alert("Login failed due to an error");
          }
        } finally {
          this.loading = false;
        }
      }
    },

    async googleSignIn() {
      try {
        this.sendTokenToBackend(this.credential);
      } catch (error) {
        console.error("Login Failed:", error);
      }
    },
    async sendTokenToBackend(token) {
      try {
        const response = await axios.post("/api/login-google-auth", { token });

        this.login({
          user: response.data.user,
          token: response.data.newToken,
        });
        this.$router.push("/");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert("User not registered, please do the SignUp.");
            this.$router.push("/SignUp");
          }
        } else {
          // Handle other kinds of errors
          console.error("Login error:", error);
          alert("Login failed due to an error");
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
