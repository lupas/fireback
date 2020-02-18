import asyncExec from '../_helpers/asyncExec.mjs'

export default async function(projectId) {
  try {
    console.info(`💬 Backing up firestore into ${projectId} Storage...`)
    const cmd = `gcloud config set project ${projectId} && gcloud alpha firestore export gs://${projectId}.appspot.com`
    await asyncExec(cmd)
    console.info(`✅ Backed up Firestore backup into ${projectId} Storage.`)
  } catch (e) {
    return Promise.reject(e)
  }
}
