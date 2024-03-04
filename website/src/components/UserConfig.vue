<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">
          <span class="primary-color">Account</span> Configuration
        </h1>
        <v-divider class="ma-6"></v-divider>
        <div v-if="user">
          <h2>User Information</h2>
          <br />
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <br />

          <v-radio-group v-model="themeChoice" label="Theme:" inline>
            <v-radio label="Dark" value="dark"></v-radio>
            <v-radio label="Light" value="light"></v-radio>
          </v-radio-group>

          <v-select
            v-model="selectedColor"
            :items="colorOptions"
            density="comfortable"
            label="Color"
          ></v-select>
          <!-- Other user information can be displayed here -->
          <v-btn color="primary" @click="updateSettings">Save Changes</v-btn>
        </div>
        <v-divider class="ma-6"></v-divider>
        <v-btn color="red" @click="deleteAccount">Delete Account</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  name: "UserConfig",
  data() {
    return {
      themeChoice: "dark",
      selectedColor: "Yellow",
    };
  },
  computed: {
    ...mapState(["user"]),
    colorOptions() {
      return this.themeChoice === "light" ? ["White"] : ["Yellow", "Green"];
    },
  },
  watch: {
    themeChoice() {
      this.selectedColor = this.colorOptions[0];
    },
  },
  methods: {
    ...mapActions(["logout"]),
    async deleteAccount() {
      if (!confirm("Are you sure you want to delete your account?")) return;

      this.toggleOverlay(true);
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.delete(
          `/api/users/delete/${this.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
        this.toggleOverlay(false);
      }
    },
    async updateSettings() {
      this.toggleOverlay(true);

      let selectedColorId = 0;
      let theme = this.themeChoice === "dark";

      switch (this.selectedColor) {
        case "Yellow" || "White":
          selectedColorId = 0;
          break;
        case "Green":
          selectedColorId = 1;
          break;
        default:
          selectedColorId = 0;
      }

      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.post(
          `/api/users/update/${this.user.id}`,
          {
            userId: this.user.id,
            darkTheme: theme,
            selectedColor: selectedColorId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          this.showSnackbar("Account successfully updated");
        } else {
          alert("Failed to update account");
        }
      } catch (error) {
        console.error("Error updating account:", error);
        alert("Error occurred while updating account");
      } finally {
        this.toggleOverlay(false);
      }
    },
    showSnackbar(message) {
      this.$root.showSnackbar(message);
    },
    toggleOverlay(show) {
      this.$root.toggleOverlay(show);
    },
    mapIdToColor(id) {
      const colorMap = {
        0: "Yellow", // Assuming ID 0 maps to Yellow
        1: "Green", // Assuming ID 1 maps to Green
        // Add more mappings if there are more IDs
      };
      return colorMap[id] || "Yellow"; // Default to "Yellow" if ID is not found
    },
    async getAccountSettings() {
      this.toggleOverlay(true);
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`/api/users/${this.user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const settings = response.data;
          this.themeChoice = settings.darkTheme ? "dark" : "light";
          this.selectedColor = this.mapIdToColor(settings.theme);
        }
      } catch (error) {
        console.error("Error fetching account settings:", error);
        alert("Error occurred while fetching account settings");
      } finally {
        this.toggleOverlay(false);
      }
    },
  },
  created() {
    if (!this.user) {
      alert("Do the Sign In before access that page.");
      this.$router.push("/SignIn?origin=UserConfig");
      return;
    }

    this.getAccountSettings();
  },
};
</script>
