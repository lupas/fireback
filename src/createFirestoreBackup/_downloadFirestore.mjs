import { inq } from "../_helpers/inquirerWrapper.mjs";
import asyncExec from "../_helpers/asyncExec.mjs";

export default async function(projectId) {
  const prompts = global.prompts;
  try {
    const answers = await inq.prompt([prompts.backupFolderName]);
    console.info(
      `💬 Downloading firestore backup from ${projectId} Storage...`
    );
    const backupPath = `gs://${projectId}.appspot.com/${answers.backupFolderName}`;
    const cdCmd = `cd ./backups/${global.folderName}`;
    const fbCmd = `gcloud config set project ${projectId} && gsutil -m cp -R ${backupPath} .`;
    const cmd = `${cdCmd} && ${fbCmd}`;
    await asyncExec(cmd);
    console.info(`✅ Downloaded Firestore backup from ${projectId} Storage.`);
  } catch (e) {
    return Promise.reject(e);
  }
}
