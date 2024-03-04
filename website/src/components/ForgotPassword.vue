<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="8" md="6">
        <v-form
          v-if="!recovery"
          ref="form"
          v-model="valid"
          @submit.prevent="sendRecoveryEmail"
        >
          <h1 class="text-center">Forgot password</h1>
          <v-divider class="ma-6"></v-divider>
          <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            v-model="email"
            :rules="emailRules"
            required
          />
          <v-btn v-if="!loading" color="primary" type="submit"
            >Send email</v-btn
          >
          <v-progress-circular
            v-else
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-form>
        <v-form
          v-else
          ref="form"
          v-model="valid"
          @submit.prevent="handlePasswordRecovery"
        >
          <h1 class="text-center">Recovery password</h1>
          <v-divider class="ma-6"></v-divider>
          <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
            :rules="passwordRules"
            required
          />
          <v-btn v-if="!loading" color="primary" type="submit"
            >Set new password</v-btn
          >
          <v-progress-circular
            v-else
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  name: "ForgotPassword",
  data() {
    return {
      loading: false,
      valid: false,
      recovery: false,
      email: "",
      password: "",
      token: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
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
    async sendRecoveryEmail() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await axios.post("/api/forgotpassword", { email: this.email });
          alert("Recovery email sent. Please check your inbox.");
          this.loading = false;
        } catch (error) {
          if (error.response) {
            if (error.response.status === 404) {
              console.log(error);
              alert("Email not registered!");
            } else if (error.response.status === 401) {
              alert("Error sending email!");
            }
          } else {
            // Handle other kinds of errors
            alert("Failed to send recovery email.");
          }
        } finally {
          this.loading = false;
        }
      }
    },
    async handlePasswordRecovery() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await axios.post("/api/resetpassword", {
            token: this.token,
            newPassword: this.password,
          });
          alert(
            "Password successfully reset. You can now log in with your new password."
          );
          this.$router.push("/SignIn"); // Redirect to sign-in page
        } catch (error) {
          if (error.response.status === 400) {
            alert("Invalid or Expired Token!");
          } else {
            alert("Failed to reset password.");
          }
        } finally {
          this.loading = false;
        }
      }
    },
  },
  created() {
    const router = useRouter();
    const queryToken = router.currentRoute.value.query.token;
    if (queryToken) {
      this.token = queryToken;
      this.recovery = true; // Set recovery to true if there's a token
    }
  },
};
</script>
