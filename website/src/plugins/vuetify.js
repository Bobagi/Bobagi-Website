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
          background: "#000000",
          surface: "#000000",
          primary: "#FFD421",
          "primary-darken-1": "#3700B3",
          secondary: "#a98d1a",
          "secondary-darken-1": "#018786",
          error: "#ffea00",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
      light: {
        colors: {
          background: "#FFFFFF",
          surface: "#000000",
          primary: "#DAA520",
          "primary-darken-1": "#3700B3",
          secondary: "#73611a",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
});
