<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">Sign Up</h1>
        <div>
          <p v-if="loggedInUser">Welcome, {{ loggedInUser.username }}</p>
        </div>
        <br />
        <v-form ref="form" v-model="valid">
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
          <v-btn color="primary" @click="registerWithEmail"> Sign Up </v-btn>
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
            <GoogleLogin :callback="callbackGoogle" />
          </div>

          <!-- autologin -->
          <!-- <GoogleLogin :callback="callback">
            <v-btn color="red"> Sign Up with Google </v-btn>
          </GoogleLogin> -->
          <v-btn color="blue" @click="registerWithLinkedIn">
            Sign Up with LinkedIn
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="showNicknameModal" persistent max-width="300px">
    <v-card>
      <v-card-title class="headline">Choose a Nickname</v-card-title>
      <v-card-text>
        <v-text-field
          label="Nickname"
          v-model="nickname"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="submitNickname">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { decodeCredential, googleLogout } from "vue3-google-login";

axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "SignUp",
  data() {
    return {
      valid: false,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      loggedIn: false,
      user: null,
      credential: null,
      showNicknameModal: false,
      nickname: "",
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
  methods: {
    async registerWithEmail() {
      if (this.$refs.form.validate()) {
        // Perform registration
        try {
          const response = await axios.post("/api/register", {
            email: this.email,
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
          });
          if (response.status == 201) {
            alert("Registered!");
            // Example of storing the token in localStorage
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data.user)
            ); // Store user info as a string
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("userToken");
            this.loggedInUser = response.data.user;
          } else {
            alert("Failed to register!");
          }
          // Handle success
        } catch (error) {
          // Handle error
        }
      }
    },
    registerWithLinkedIn() {
      // Logic
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
          this.showNicknameModal = true;
        } else {
          // Handle normal login response
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error sending token to backend:", error);
      }
    },

    async submitNickname() {
      try {
        const response = await axios.post("/api/register-google-user", {
          email: this.emailFromGoogle,
          nickname: this.nickname,
        });

        if (response.status === 200) {
          this.showNicknameModal = false;
        } else {
          alert("Failed to register user!");
        }
      } catch (error) {
        console.error("Error submitting nickname:", error);
      }
    },
    LogoutGoogle() {
      googleLogout();
      this.loggedIn = false;
      this.user = null;
      this.credential = null;
    },
  },
};
</script>
