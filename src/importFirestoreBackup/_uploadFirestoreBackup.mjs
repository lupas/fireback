import asyncExec from "../_helpers/asyncExec.mjs";

export default async function({ projectId, backupId }) {
  const folderPath = `./firebackups/${projectId}/${backupId}/`;
  try {
    console.info(`💬 Uploading firestore backup to ${projectId} Storage...`);
    const fbCmd = `gcloud config set project ${projectId} && gsutil -m cp -R ${folderPath} gs://${projectId}.appspot.com`;
    const cmd = `${fbCmd}`;
    await asyncExec(cmd);
    console.info(`✅ Uploaded Firestore backup to ${projectId} Storage.`);
    return folderPath;
  } catch (e) {
    return Promise.reject(e);
  }
}
