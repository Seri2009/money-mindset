//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      'phc_Y1nGZrdU8Uj0fJ6wR2G1upukDucN1Xlecdi9jTqgkfZ',
      {
        api_host: 'https://us.i.posthog.com',
      }
    );
  },
};