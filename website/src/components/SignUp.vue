<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">Sign Up</h1>
        <v-divider class="my-4"></v-divider>
        <v-form ref="form" v-model="valid" @submit.prevent="registerWithEmail">
          <v-text-field
            label="Username"
            prepend-icon="mdi-account"
            v-model="username"
            :rules="usernameRules"
            required
          />
          <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            v-model="email"
            :rules="emailRules"
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
          <v-text-field
            label="Confirm Password"
            prepend-icon="mdi-lock-check"
            type="password"
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            required
          />
          <v-btn v-if="!loading" color="primary" type="submit">Sign Up</v-btn>
          <v-progress-circular
            v-else
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-form>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-evenly">
          <div v-if="loggedIn">
            <v-btn color="red" @click="LogoutGoogle"> Logout </v-btn>
            <h2>The name is: {{ user.name }}</h2>
            <h2>The email is: {{ user.email }}</h2>
            <img :src="user.picture" />
          </div>
          <div v-else>
            <GoogleLogin id="GoogleSign" :callback="callbackGoogle" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="showNicknameModal" persistent max-width="400px">
    <v-card>
      <v-card-title class="headline">
        <div style="display: flex; align-items: center">
          Choose a Username
          <v-spacer></v-spacer>
          <v-btn icon @click="showNicknameModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Username"
          prepend-icon="mdi-account"
          v-model="username"
          :rules="usernameRules"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!loading" color="primary" @click="submitNickname"
          >Submit</v-btn
        >
        <v-progress-circular
          v-else
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { decodeCredential, googleLogout } from "vue3-google-login";
import { mapState, mapActions } from "vuex";

axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "SignUp",
  data() {
    return {
      loading: false,
      valid: false,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      loggedIn: false,
      user: null,
      credential: null,
      showNicknameModal: false,
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length >= 3) || "Username must be at least 3 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.password || "Passwords do not match",
      ],

      callbackGoogle: (response) => {
        console.log("logged In");
        this.loggedIn = true;
        console.log(response);
        this.credential = response.credential;
        this.user = decodeCredential(response.credential);
        this.googleSignIn();
      },
    };
  },
  computed: {
    ...mapState(["user", "token"]),
  },
  methods: {
    ...mapActions(["login", "registerUser", "submitNicknameAction"]),
    checkAuth() {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("userToken");
      if (user && token) {
        this.login({ user, token });
      }
    },
    async registerWithEmail() {
      if (this.$refs.form.validate()) {
        this.loading = true; // Start loading
        try {
          const success = await this.registerUser({
            email: this.email,
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
          });

          if (success) {
            this.$router.push("/"); // Redirect to home page
          } else {
            alert("Failed to register!");
          }
        } catch (error) {
          alert("Error on register account!");
        } finally {
          this.loading = false; // Stop loading
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
        const response = await axios.post("/api/google-auth", { token });
        if (response.status === 202) {
          // Show modal for additional info
          this.emailFromGoogle = response.data.email; // Store the email for later use
          this.GoogleID = response.data.sub;
          this.showNicknameModal = true;
        } else if (response.status === 200) {
          // Email already registered
          // await this.login({
          //   email: this.emailFromGoogle,
          //   username: this.username,
          // });
          alert("Email already registered!");
        } else {
          // Handle normal login response
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error sending token to backend:", error);
      }
    },

    async submitNickname() {
      if (this.username == "" || this.username.length < 3) {
        return;
      }
      this.loading = true;
      const success = await this.submitNicknameAction({
        email: this.emailFromGoogle,
        username: this.username,
        sub: this.GoogleID,
      });

      if (success) {
        this.showNicknameModal = false;
      } else {
        alert("Failed to register user!");
      }
      this.loading = false;
    },

    LogoutGoogle() {
      googleLogout();
      this.loggedIn = false;
      this.user = null;
      this.credential = null;
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>
