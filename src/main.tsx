import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

const posthogKey = 'phc_Y1nGZrdU8Uj0fJ6wR2G1upukDucN1Xlecdi9jTqgkfZ';
let apiHost = 'https://us.i.posthog.com';

async function isPostHogReachable(url: string): Promise<boolean> {
  try {
    await fetch(`${url}/decide`, {
      method: "POST",
      mode: "no-cors"
    });
    // If no error thrown, assume it's reachable
    return true;
  } catch (err) {
    return false;
  }
}

async function initPostHog() {
  const reachable = await isPostHogReachable(apiHost);

  if (!reachable) {
    console.warn("Primary PostHog endpoint unreachable. Falling back.");
    apiHost = "https://assets.serikanj.workers.dev/";
  }

  posthog.init(posthogKey, {
    api_host: apiHost,
    person_profiles: "identified_only",
  });

  if (!posthog.__loaded) {
    console.log("PostHog not loaded");
  }
}

initPostHog();

createRoot(document.getElementById("root")!).render(<App />);