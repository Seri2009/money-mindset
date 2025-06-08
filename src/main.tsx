import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

const posthogKey = 'phc_Y1nGZrdU8Uj0fJ6wR2G1upukDucN1Xlecdi9jTqgkfZ';
let apiHost = 'https://us.i.posthog.com';

async function initPostHog() {
  if (posthogKey && apiHost) {
    try {
      const data = await fetch(apiHost, { method: "HEAD", mode: 'no-cors'});
      if (!data.ok && data.status !== 404) {
        apiHost = "https://assets.serikanj.workers.dev/";
      }
    } catch (error) {
      console.log("f u");
      apiHost = "https://assets.serikanj.workers.dev/";
    }
    posthog.init(posthogKey, {
      api_host: apiHost,
      person_profiles: "identified_only",
    });
  }
}

initPostHog();

if(!posthog.__loaded){
  console.log("not loaded");
}

createRoot(document.getElementById("root")!).render(<App />);
