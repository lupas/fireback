import _importFirestoreBackup from "./_importFirestoreBackup.mjs";
import _importAuthUsers from "./_importAuthUsers.mjs";
import _uploadFirestoreBackup from "./_uploadFirestoreBackup.mjs";
import { inq } from "../_helpers/inquirerWrapper.mjs";

// ******************************************************************
// ******************************************************************
// ******************************************************************

export default async function main() {
  console.clear();
  const prompts = global.prompts;
  if (!prompts) {
    return;
  }
  console.info("Which backup do you want to restore?");
  const backupAnswers = await inq.prompt([prompts.availableBackups]);
  const backup = backupAnswers.backup;

  console.info("Which project do you want to upload this backup to?");
  const targetIdAnswers = await inq.prompt([prompts.projectId]);
  const targetId = targetIdAnswers.projectId;

  try {
    await _uploadFirestoreBackup(backup, targetId);
    await inq.prompt([prompts.confirmDeletion]);
    await _importFirestoreBackup(backup, targetId);
    await _importAuthUsers(backup, targetId);
  } catch (e) {
    console.error(`❌ ${e}`);
  }

  process.exit();
}

main();
