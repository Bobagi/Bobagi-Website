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
        <h1 class="text-center"><span class="primary-color">Sign</span> Up</h1>
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
          <div>
            <GoogleLogin
              id="GoogleSign"
              :callback="callbackGoogle"
              @click="loading = true"
            />
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
        <v-btn
          v-if="!loading"
          color="primary"
          variant="elevated"
          @click="submitNickname"
        >
          Submit
        </v-btn>
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
import { decodeCredential } from "vue3-google-login";
import { mapState, mapActions } from "vuex";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

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
            this.redirectToOrigin(); // Redirect to home page
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
      this.loading = true;
      try {
        this.sendTokenToBackend(this.credential);
      } catch (error) {
        console.error("Login Failed:", error);
      } finally {
        this.loading = false;
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
          alert("Email already registered, please Sign In.");
          const origin = this.$route.query.origin;
          if (origin) {
            this.$router.push("/SignIn?origin=" + origin);
          } else {
            this.$router.push("/SignIn");
          }
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
      const response = await this.submitNicknameAction({
        email: this.emailFromGoogle,
        username: this.username,
        sub: this.GoogleID,
      });

      if (response) {
        await this.login({
          user: response.data.user,
          token: response.data.token,
        });

        this.showNicknameModal = false;
        this.redirectToOrigin();
      } else {
        alert("Failed to register user!");
      }
      this.loading = false;
    },

    LogoutGoogle() {
      this.user = null;
      this.credential = null;
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
  },
  created() {
    this.checkAuth();
  },
};
</script>
