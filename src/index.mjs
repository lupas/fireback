#!/usr/bin/env node
import { inq, setPrompts } from "./_helpers/inquirerWrapper.mjs";
const execPath = process.cwd();
import createFirestoreBackup from "./createFirestoreBackup/index.mjs";
import importFirestoreBackup from "./importFirestoreBackup/index.mjs";

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
    return console.error(
      "❌",
      "Could not find fireback.config.mjs. Make sure to have this file created in the folder you run the script."
    );
  }
  // Set FolderName
  global.folderName = new Date().toISOString();
  setPrompts();
  const prompts = global.prompts;

  const choice = await inq.prompt([prompts.mainCommand]);
  try {
    switch (choice.mainCommand) {
      case "backup:create":
        await createFirestoreBackup();
        break;

      case "backup:restore":
        await importFirestoreBackup();
        break;

      // case "firestore:rules:deploy":
      //   answers = await inq.prompt([prompts.env]);
      //   projectId = `amiji-${answers.env}`;
      //   useCmd = `${cdFirebase} firebase use ${projectId}`;
      //   deployCmd = `firebase deploy --only firestore:rules`;
      //   cmd = `${useCmd} && ${deployCmd}`;
      //   await asyncExec(cmd, true);
      //   console.info(`✅ Deployed rules for ${projectId}.`);
      //   break;

      // case "firestore:indexes:deploy":
      //   answers = await inq.prompt([prompts.env]);
      //   projectId = `amiji-${answers.env}`;
      //   useCmd = `${cdFirebase} firebase use ${projectId}`;
      //   deployCmd = `firebase deploy --only firestore:indexes`;
      //   cmd = `${useCmd} && ${deployCmd}`;
      //   await asyncExec(cmd, true);
      //   console.info(`✅ Deployed indexes for ${projectId}.`);
      //   break;

      // case "firestore:indexes:download":
      //   answers = await inq.prompt([prompts.env]);
      //   projectId = `amiji-${answers.env}`;
      //   useCmd = `${cdFirebase} firebase use ${projectId}`;
      //   downloadCmd = `firebase firestore:indexes`;
      //   cmd = `${useCmd} && ${downloadCmd}`;
      //   await asyncExec(cmd, true);
      //   console.info(`✅ Downloaded indexes for ${projectId}.`);
      //   break;
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
