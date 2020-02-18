#!/usr/bin/env node
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import { inq, setPrompts } from "./_helpers/inquirerWrapper.mjs";
import asyncExec from "./_helpers/asyncExec.mjs";
const execPath = process.cwd();
import createFirestoreBackup from "./createFirestoreBackup/index.mjs";

// ******************************************************************
// ******************************************************************
// ******************************************************************

global.__basePath = `${__dirname}/`; // Project root outside _scripts
const cdMain = `cd ${__basePath} &&`;
// ******************************************************************
// ******************************************************************
// ******************************************************************

async function main() {
  console.clear();
  // LOAD CONFIG FILE IF AVAILABLE
  try {
    const configObj = await import(`${execPath}/fireback.config.mjs`);
    global.config = configObj.default;
  } catch (e) {
    console.error("❌", e);
  }
  // Set FolderName
  global.folderName = new Date().toISOString();
  await setPrompts();
  const prompts = global.prompts;

  const choice = await inq.prompt([prompts.mainCommand]);
  try {
    let answers, cmd, projectId, useCmd, downloadCmd, deployCmd;
    switch (choice.mainCommand) {
      case "backup:create":
        await createFirestoreBackup();
        break;

      case "backup:restore":
        await asyncExec(`${cdMain} npm run importFirestoreBackup`, true);
        break;

      case "firestore:rules:deploy":
        answers = await inq.prompt([prompts.env]);
        projectId = `amiji-${answers.env}`;
        useCmd = `${cdFirebase} firebase use ${projectId}`;
        deployCmd = `firebase deploy --only firestore:rules`;
        cmd = `${useCmd} && ${deployCmd}`;
        await asyncExec(cmd, true);
        console.info(`✅ Deployed rules for ${projectId}.`);
        break;

      case "firestore:indexes:deploy":
        answers = await inq.prompt([prompts.env]);
        projectId = `amiji-${answers.env}`;
        useCmd = `${cdFirebase} firebase use ${projectId}`;
        deployCmd = `firebase deploy --only firestore:indexes`;
        cmd = `${useCmd} && ${deployCmd}`;
        await asyncExec(cmd, true);
        console.info(`✅ Deployed indexes for ${projectId}.`);
        break;

      case "firestore:indexes:download":
        answers = await inq.prompt([prompts.env]);
        projectId = `amiji-${answers.env}`;
        useCmd = `${cdFirebase} firebase use ${projectId}`;
        downloadCmd = `firebase firestore:indexes`;
        cmd = `${useCmd} && ${downloadCmd}`;
        await asyncExec(cmd, true);
        console.info(`✅ Downloaded indexes for ${projectId}.`);
        break;
    }
  } catch (e) {
    if (e.signal === "SIGINT") {
      console.info("🥺 Script terminated by User.");
    } else {
      console.error("❌", e);
    }
  }
  process.exit();
}

main();
