import { inq } from "../_helpers/inquirerWrapper.mjs";
import asyncExec from "../_helpers/asyncExec.mjs";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// ******************************************************************
// ******************************************************************
// ******************************************************************

global.__basePath = `${__dirname}/../..`; // Project root outside _scripts

// ******************************************************************
// ******************************************************************
// ******************************************************************

async function main() {
  console.clear();
  const prompts = global.prompts;
  const answers = await inq.prompt([prompts.websiteIds, prompts.envs]);
  const websites = answers.websiteIds;
  const envs = answers.envs;

  try {
    for (const env of envs) {
      process.env.ENV = env;
      process.env.FIRE_ENV = env;
      for (const websiteId of websites) {
        process.env.WEBSITE_ID = websiteId;
        await _generateAndDeploy(websiteId, env);
        console.info(`------------------------------------`);
      }
    }
  } catch (e) {
    console.error(`❌`, e);
  }

  process.exit();
}

const _generateAndDeploy = async function(websiteId, env) {
  const projectId = `${websiteId}-${env}`;
  try {
    /** Generate Nuxt-App */
    console.info(`💬 Generating Nuxt-App for ${projectId}...`);
    await asyncExec(`cd ${__basePath}/web && npm run generate`);
    console.info(`✅ Nuxt generate for ${websiteId} complete.`);

    /** Deploy to Firebase */
    console.info(`💬 Deploying ${projectId} to Firebase Hosting...`);
    await asyncExec(
      `cd ${__basePath}/web && firebase use amiji-${env} && firebase deploy --only hosting:${projectId}`
    );
    console.info(`✅ Deployed ${projectId} to Firebase Hosting.`);
  } catch (e) {
    return Promise.reject(e);
  }
};

main();
