// Injects PWA metadata into the GitHub Pages export (dist-gh) so the app can
// be added to a phone home screen and launched fullscreen (standalone).
const fs = require("fs");
const path = require("path");

const dist = path.resolve(__dirname, "..", "dist-gh");
const indexPath = path.join(dist, "index.html");

const manifest = {
  name: "ISIC",
  short_name: "ISIC",
  start_url: "/AL-IVE/",
  scope: "/AL-IVE/",
  display: "standalone",
  orientation: "portrait",
  background_color: "#ffffff",
  theme_color: "#242044",
  icons: [
    { src: "/AL-IVE/apple-touch-icon.png", sizes: "512x512", type: "image/png" },
  ],
};

fs.writeFileSync(path.join(dist, "manifest.webmanifest"), JSON.stringify(manifest, null, 2));

const headTags = [
  '<meta name="apple-mobile-web-app-capable" content="yes" />',
  '<meta name="mobile-web-app-capable" content="yes" />',
  '<meta name="apple-mobile-web-app-status-bar-style" content="default" />',
  '<meta name="apple-mobile-web-app-title" content="ISIC" />',
  '<meta name="theme-color" content="#242044" />',
  '<link rel="manifest" href="/AL-IVE/manifest.webmanifest" />',
  '<link rel="apple-touch-icon" href="/AL-IVE/apple-touch-icon.png" />',
].join("\n    ");

let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("apple-mobile-web-app-capable")) {
  html = html.replace("</head>", `    ${headTags}\n  </head>`);
  fs.writeFileSync(indexPath, html);
}

console.log("Patched dist-gh for GitHub Pages PWA.");
