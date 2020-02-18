import _downloadAuthUsers from "./_downloadAuthUsers.mjs";
import _backupFirestore from "./_backupFirestore.mjs";
import _downloadFirestore from "./_downloadFirestore.mjs";
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

export default async function main() {
  console.clear();
  const prompts = global.prompts;
  if (!prompts) {
    return;
  }
  console.info("From which project do you want to do a backup?");
  const answers = await inq.prompt([prompts.projectId]);
  const projectId = answers.projectId;

  try {
    await _downloadAuthUsers(projectId);
    await _backupFirestore(projectId);
    await _downloadFirestore(projectId);
  } catch (e) {
    console.error(`❌ ${e}`);
  }

  process.exit();
}

main();
