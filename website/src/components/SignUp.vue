<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">Sign Up</h1>
        <br />
        <v-form>
          <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            v-model="email"
          />
          <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
          />

          <v-btn color="primary" class="mr-4" @click="registerWithEmail">
            Sign Up
          </v-btn>
        </v-form>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-evenly">
          <v-btn color="red" @click="registerWithGoogle">
            Sign Up with Google
          </v-btn>
          <v-btn color="blue" @click="registerWithLinkedIn">
            Sign Up with LinkedIn
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    registerWithEmail() {
      // Logic for registering with Email and Password
    },
    registerWithGoogle() {
      // Logic for Google Authentication
    },
    registerWithLinkedIn() {
      // Logic for LinkedIn Authentication
    },
  },
};
</script>
