import asyncExec from "../_helpers/asyncExec.mjs";

export default async function({ firestoreFolderId }, targetId) {
  try {
    console.info(
      `💬 Importing firestore backup into ${targetId}... (might take a while)`
    );
    const backupPath = `gs://${targetId}.appspot.com/${firestoreFolderId}`;
    const cmd = `gcloud config set project ${targetId} && gcloud alpha firestore import ${backupPath}`;
    await asyncExec(cmd);
    console.info(`✅ Imported Firestore backup into ${targetId}.`);
  } catch (e) {
    return Promise.reject(e);
  }
}
