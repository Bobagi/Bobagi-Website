// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          background: "#1A1A1A",
          content: "#1A1A1A",
          contentbg: "#FFD421",
          surface: "#1A1A1A",
          primary: "#FFD421",
          "primary-darken-1": "#3700B3",
          secondary: "#a98d1a",
          "secondary-darken-1": "#018786",
          tertiary: "#FFD421",
          error: "#ffea00",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
      darkGreen: {
        // New dark theme with green colors
        colors: {
          background: "#1A1A1A",
          content: "#1A1A1A",
          contentbg: "#00FF00", // Example green color
          surface: "#1A1A1A",
          primary: "#00FF00", // Example green color
          "primary-darken-1": "#3700B3",
          secondary: "#008000", // Example green color
          "secondary-darken-1": "#018786",
          tertiary: "#00FF00", // Example green color
          error: "#32CD32",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
      light: {
        colors: {
          background: "#F2F2F2",
          content: "#F2F2F2",
          contentbg: "#000000",
          surface: "#000000",
          primary: "#000000",
          "primary-darken-1": "#3700B3",
          secondary: "#73611a",
          "secondary-darken-1": "#018786",
          tertiary: "#F2F2F2",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
});
