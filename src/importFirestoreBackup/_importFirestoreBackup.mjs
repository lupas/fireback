import asyncExec from "../_helpers/asyncExec.mjs";

export default async function({ projectId, firestoreFolderId }) {
  try {
    console.info(
      `💬 Importing firestore backup into ${projectId}... (might take a while)`
    );
    const backupPath = `gs://${projectId}.appspot.com/${firestoreFolderId}`;
    const cmd = `gcloud config set project ${projectId} && gcloud alpha firestore import ${backupPath}`;
    await asyncExec(cmd);
    console.info(`✅ Imported Firestore backup into ${projectId}.`);
  } catch (e) {
    return Promise.reject(e);
  }
}
