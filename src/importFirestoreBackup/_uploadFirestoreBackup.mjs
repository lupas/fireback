import asyncExec from "../_helpers/asyncExec.mjs";

export default async function(
  { projectId, backupId, firestoreFolderId },
  targetId
) {
  const folderPath = `./firebackups/${projectId}/${backupId}/${firestoreFolderId}`;
  try {
    console.info(`💬 Uploading firestore backup to ${targetId} Storage...`);
    const fbCmd = `gcloud config set project ${targetId} && gsutil -m cp -R ${folderPath} gs://${targetId}.appspot.com`;
    const cmd = `${fbCmd}`;
    await asyncExec(cmd);
    console.info(`✅ Uploaded Firestore backup to ${targetId} Storage.`);
    return folderPath;
  } catch (e) {
    return Promise.reject(e);
  }
}
