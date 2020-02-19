import asyncExec from "../_helpers/asyncExec.mjs";

export default async function(projectId) {
  try {
    console.info(`💬 Backing up firestore into ${projectId} Storage...`);
    const cmd = `gcloud config set project ${projectId} && gcloud alpha firestore export gs://${projectId}.appspot.com`;
    const result = await asyncExec(cmd);

    // Get backup folder from result:
    const regex1 = /gs(.*)/i;
    const outputUriPrefix = result.stdout.match(regex1)[0];
    const regex2 = /(?<=\.com\/)(.*)/i;
    const backupFolderName = outputUriPrefix.match(regex2)[0];
    global.backupFolderName = backupFolderName;
    console.info(
      `✅ Backed up Firestore backup into ${projectId} Storage folder ${backupFolderName}`
    );
  } catch (e) {
    return Promise.reject(e);
  }
}
