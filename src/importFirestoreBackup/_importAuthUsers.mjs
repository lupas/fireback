import { inq } from "../_helpers/inquirerWrapper.mjs";
import asyncExec from "../_helpers/asyncExec.mjs";

export default async function({ projectId, backupId }) {
  const prompts = global.prompts;
  const filePath = `./firebackups/${projectId}/${backupId}/AllAuthUsers.json`;
  try {
    const answers = await inq.prompt([prompts.hashKey, prompts.saltSeparator]);
    console.info(`💬 Importing auth user into ${projectId}...`);
    const cliCmd = `firebase use ${projectId} && firebase auth:import ${filePath} --hash-algo=scrypt --rounds=8 --mem-cost=14 --hash-key=${answers.hashKey} --salt-separator=${answers.saltSeparator}`;
    await asyncExec(cliCmd);
    console.info(`✅ Imported Auth User into ${projectId}.`);
  } catch (e) {
    return Promise.reject(e);
  }
}
