import asyncExec from "../_helpers/asyncExec.mjs";

export default async function(projectId) {
  try {
    console.info(
      `💬 Downloading firestore backup from ${projectId} Storage...`
    );
    const backupPath = `gs://${projectId}.appspot.com/${global.backupFolderName}`;
    const cdCmd = `cd ${global.pathToFolder}`;
    const fbCmd = `gcloud config set project ${projectId} && gsutil -m cp -R ${backupPath} .`;
    const cmd = `${cdCmd} && ${fbCmd}`;
    await asyncExec(cmd);
    console.info(`✅ Downloaded Firestore backup from ${projectId} Storage.`);
  } catch (e) {
    return Promise.reject(e);
  }
}
