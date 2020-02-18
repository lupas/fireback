import asyncExec from '../_helpers/asyncExec.mjs'

export default async function(projectId, backupFolderName) {
  try {
    console.info(`💬 Importing firestore backup into ${projectId}...`)
    const backupPath = `gs://${projectId}.appspot.com/${backupFolderName}`
    const cmd = `gcloud config set project ${projectId} && gcloud alpha firestore import ${backupPath}`
    await asyncExec(cmd)
    console.info(`✅ Imported Firestore backup into ${projectId}.`)
  } catch (e) {
    return Promise.reject(e)
  }
}
