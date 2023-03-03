// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Fabrizio Pace";
export const SITE_DESCRIPTION =
  "Hello, welcome to my blog! I write about Neptune Software and other technologies.";
export const TWITTER_HANDLE = "";
export const MY_NAME = "Fabrizio Pace";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
