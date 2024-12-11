const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        base: ["var(----font-base)"],
        button: ["var(----font-base)"],
        icon: ["var(--font-icon)"],
      },
      fontSize: {
        "responsive-lg":
          "clamp(var(--font-size-lg-min), var(--font-size-lg-var), var(--font-size-lg-max))",
          "responsive-sm":
          "clamp(var(--font-size-sm-min), var(--font-size-sm-var), var(--font-size-sm-max))",
        "responsive-regular":
          "clamp(var(--font-size-regular-min), var(--font-size-regular-var), var(--font-size-regular-max))",
        "responsive-medium":
          "clamp(var(--font-size-medium-min), var(--font-size-medium-var), var(--font-size-medium-max))",
        "responsive-icon":
          "clamp(var(--font-size-icon-min), var(--font-size-icon-var), var(--font-size-icon-max))",
          "responsive-oauth":
          "clamp(var(--font-size-oauth-min), var(--font-size-oauth-var), var(--font-size-oauth-max))",
          "responsive-regular-lg":
          "clamp(var(--font-size-regular-lg-min), var(--font-size-regular-lg-var), var(--font-size-regular-lg-max))",
      },
      colors: {
        "devtiny-theme": "var(--color-devtiny-theme)",
        "devtiny-theme-light": "var(--color-devtiny-theme-light)",
        "devtiny-theme-2": "var(--color-devtiny-theme-2)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
