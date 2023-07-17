/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");
const { i18n } = require("./next-i18next.config");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
});

module.exports = withPWA(withContentlayer({
  i18n
}));
