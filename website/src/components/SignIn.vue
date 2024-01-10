<template>
  <v-container>
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
          <div class="text-left">
            <v-btn
              density="compact"
              variant="tonal"
              color="primary"
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
        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-evenly">
          <GoogleLogin id="GoogleSign" :callback="callbackGoogle" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

axios.defaults.baseURL = "http://localhost:3000";

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
  },
};
</script>
