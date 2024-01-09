<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">Account Configuration</h1>
        <v-divider class="my-4"></v-divider>
        <div v-if="user">
          <h2>User Information</h2>
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <!-- Other user information can be displayed here -->
        </div>
        <v-divider class="my-4"></v-divider>
        <v-btn color="red" v-if="!loading" @click="deleteAccount"
          >Delete Account</v-btn
        >
        <v-progress-circular
          v-else
          indeterminate
          color="red"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "UserConfig",
  data() {
    return { loading: false };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async deleteAccount() {
      if (!confirm("Are you sure you want to delete your account?")) return;

      this.loading = true;
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.delete(`/api/users/${this.user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          alert("Account successfully deleted");
          this.logout();
          this.$router.push("/");
        } else {
          alert("Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error occurred while deleting account");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
