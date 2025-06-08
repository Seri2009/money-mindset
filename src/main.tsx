import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

const posthogKey = 'phc_Y1nGZrdU8Uj0fJ6wR2G1upukDucN1Xlecdi9jTqgkfZ';
let apiHost = process.env.HOST1;

async function initPostHog() {
  if (posthogKey && apiHost) {
    try {
      await fetch(apiHost, { method: "HEAD", mode: 'no-cors'});
    } catch (error) {
      apiHost = "https://{yourdomain}.com/{your-worker-prefix}";
    }
    posthog.init(posthogKey, {
      api_host: apiHost,
      person_profiles: "identified_only",
    });
  }
}

initPostHog();

createRoot(document.getElementById("root")!).render(<App />);
