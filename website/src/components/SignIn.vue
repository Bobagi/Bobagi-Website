<template>
  <v-container>
    <v-row
      justify="center"
      class="text-center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <h1 class="text-center"><span class="primary-color">Sign</span> In</h1>
        <v-divider class="ma-6"></v-divider>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="signIn"
        >
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
          <div
            class="text-left"
            style="margin-bottom: 10px; margin-left: 40px"
          >
            <v-btn
              density="compact"
              variant="text"
              color="primary"
              class="pa-0"
              @click="onForgotPasswordClick"
            >Forgot Password?</v-btn>
          </div>
          <v-btn
            color="primary"
            type="submit"
          >Sign In</v-btn>
        </v-form>

        <div class="d-flex justify-space-evenly ma-6">
          <GoogleLogin
            id="GoogleSign"
            :callback="callbackGoogle"
            @click="this.toggleOverlay(true)"
          />
        </div>
        <v-divider class="ma-6"></v-divider>
        <div style="display: flex; justify-content: center; gap: 5px">
          <p>Don't have an account?</p>
          <v-btn
            class="px-1"
            density="compact"
            variant="text"
            color="primary"
            :to="signUpRoute"
          >Sign Up</v-btn>
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
        try {
          this.credential = response.credential;
          this.user = decodeCredential(response.credential);
          this.googleSignIn();
        } catch (isError) {
          console.error("Login Failed:", isError);
        } finally {
          this.toggleOverlay(false);
        }
      },
    };
  },

  computed: {
    signUpRoute() {
      // Check if 'origin' parameter exists in the current route
      const origin = this.$route.query.origin;

      if (origin) {
        // If it exists, include it in the route object for the button
        return { name: "SignUp", query: { origin: origin } };
      } else {
        // If not, just return the route name
        return { name: "SignUp" };
      }
    },
  },

  methods: {
    ...mapActions(["login"]),
    onForgotPasswordClick() {
      this.$router.push("/ForgotPassword"); // Example route
    },
    async signIn() {
      if (this.$refs.form.validate()) {
        this.toggleOverlay(true);
        try {
          const response = await axios.post("/api/login", {
            emailOrUsername: this.emailOrUsername,
            password: this.password,
          });

          this.login({
            user: response.data.user,
            token: response.data.token,
          });
          this.redirectToOrigin();
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
          this.toggleOverlay(false);
        }
      }
    },

    async googleSignIn() {
      try {
        console.log("Pressed Google Sign In");
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
        this.redirectToOrigin();
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
        this.toggleOverlay(false);
      }
    },
    redirectToOrigin() {
      const origin = this.$route.query.origin;
      if (origin) {
        // If the origin parameter exists, redirect to that path
        this.$router.push(`/${origin}`);
      } else {
        // If the origin parameter is not present, redirect to the default path
        this.$router.push("/");
      }
    },
    toggleOverlay(show) {
      this.$root.toggleOverlay(show);
    },
  },
};
</script>
