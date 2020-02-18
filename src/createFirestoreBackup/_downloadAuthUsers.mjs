import asyncExec from "../_helpers/asyncExec.mjs";

export default async function(projectId) {
  try {
    console.info(`💬 Downloading auth user from ${projectId}...`);
    const pathToFolder = `./backups/${global.folderName}`;
    await asyncExec(`mkdir -p ${pathToFolder}`);
    const cdCmd = `cd ${pathToFolder}`;
    const fbCmd = `firebase use ${projectId} && firebase auth:export AllAuthUsers.json`;
    const cmd = `${cdCmd} && ${fbCmd}`;
    await asyncExec(cmd);
    console.info(`✅ Downloaded Auth User from ${projectId}.`);
  } catch (e) {
    return Promise.reject(e);
  }
}
