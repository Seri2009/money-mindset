import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

posthog.init(
  'phc_Y1nGZrdU8Uj0fJ6wR2G1upukDucN1Xlecdi9jTqgkfZ',
  {
    api_host: 'https://us.i.posthog.com'
  }
)

createRoot(document.getElementById("root")!).render(<App />);
