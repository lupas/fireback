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
  const answers = await inq.prompt([prompts.availableBackups]);
  const backup = answers.backup;

  try {
    await _uploadFirestoreBackup(backup);
    await inq.prompt([prompts.confirmDeletion]);
    await _importFirestoreBackup(backup);
    await _importAuthUsers(backup);
  } catch (e) {
    console.error(`❌ ${e}`);
  }

  process.exit();
}

main();
