import _importFirestoreBackup from "./_importFirestoreBackup";
import _importAuthUsers from "./_importAuthUsers";
import _uploadFirestoreBackup from "./_uploadFirestoreBackup";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import { inq } from "../_helpers/inquirerWrapper.mjs";

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
  console.info("To which environment do you want to upload?");
  const answers = await inq.prompt([prompts.env]);
  const projectId = `amiji-${answers.env}`;

  try {
    const backupFolderName = await _uploadFirestoreBackup(projectId);
    await inq.prompt([prompts.confirmDeletion]);
    await _importFirestoreBackup(projectId, backupFolderName);
    await _importAuthUsers(projectId);
  } catch (e) {
    console.error(`❌ ${e}`);
  }

  process.exit();
}

main();
