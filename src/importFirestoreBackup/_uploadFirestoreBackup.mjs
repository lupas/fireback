import { inq } from "../_helpers/inquirerWrapper.mjs";
import asyncExec from "../_helpers/asyncExec.mjs";

export default async function(projectId) {
  const prompts = global.prompts;
  try {
    const answers = await inq.prompt([prompts.backupFolderName]);
    console.info(`💬 Uploading firestore backup to ${projectId} Storage...`);
    const cdCmd = `cd ${__basePath}/firebaseScripts/_backups/`;
    const fbCmd = `gcloud config set project ${projectId} && gsutil -m cp -R ${answers.backupFolderName} gs://${projectId}.appspot.com`;
    const cmd = `${cdCmd} && ${fbCmd}`;
    await asyncExec(cmd);
    console.info(`✅ Uploaded Firestore backup to ${projectId} Storage.`);
    return answers.backupFolderName;
  } catch (e) {
    return Promise.reject(e);
  }
}
