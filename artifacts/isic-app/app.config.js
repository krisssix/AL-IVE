const appJson = require("./app.json");

// GH_PAGES=1 is set when exporting the static web build for GitHub Pages,
// which serves the app from the /AL-IVE subpath.
module.exports = () => {
  const config = { ...appJson.expo };
  if (process.env.GH_PAGES) {
    config.web = { ...config.web, output: "single" };
    config.experiments = { ...config.experiments, baseUrl: "/AL-IVE" };
  }
  return config;
};
