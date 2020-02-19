import inquirer from "inquirer";
import FsExtra from "fs-extra";
export const inq = inquirer;

export function setPrompts() {
  const availableBackups = getAvailableBackupsPrompt();
  const mainMenuPrompts = getMainMenuPrompts(availableBackups);

  const promptsObj = {
    /** Lists ******/
    /************* */
    mainCommand: {
      type: "list",
      name: "mainCommand",
      default: "serve",
      message: "What do you want to do?:",
      choices: mainMenuPrompts,
      pageSize: 99999
    },
    projectId: {
      type: "list",
      name: "projectId",
      default: [],
      message: "Choose project:",
      choices: global.config.projects
    },
    availableBackups: {
      type: "list",
      name: "backup",
      default: [],
      message: "Choose backup:",
      choices: availableBackups
    },
    /** Inputs *****/
    /************* */
    hashKey: {
      type: "input",
      name: "hashKey",
      message: "Enter base64_signer_key (of source project!): "
    },
    saltSeparator: {
      type: "input",
      name: "saltSeparator",
      message: "Enter base64_salt_separator (of source project!):"
    },
    backupFolderName: {
      type: "input",
      name: "backupFolderName",
      message:
        "Please enter the backups Storage path (e.g. 2019-01-06T15:49:08_73188):"
    },
    /** Confirm *****/
    /************* */
    confirmDeletion: {
      type: "confirm",
      name: "confirmDeletion",
      message:
        "Delete all Firestore files (& Auth Users if wished) manually and then confirm."
    }
  };
  global.prompts = promptsObj;
}

function getAvailableBackupsPrompt() {
  try {
    const projectFolders = FsExtra.readdirSync("./firebackups");
    const availableBackups = [];

    for (const projectId of projectFolders) {
      availableBackups.push(new inquirer.Separator(projectId));
      const backups = FsExtra.readdirSync(`./firebackups/${projectId}`);
      for (const backupId of backups) {
        availableBackups.push({
          name: backupId,
          value: {
            projectId: projectId,
            backupId: backupId,
            firestoreFolderId: getFirestoreFolderId(projectId, backupId)
          }
        });
      }
    }
    return availableBackups;
  } catch (e) {
    return [];
  }
}

function getFirestoreFolderId(projectId, backupId) {
  const files = FsExtra.readdirSync(`./firebackups/${projectId}/${backupId}`);
  files.splice(files.indexOf("AllAuthUsers.json"), 1);
  return files[0];
}

function getMainMenuPrompts(availableBackups) {
  const prompts = [
    new inquirer.Separator("Firestore"),
    {
      name: "Create Backup (Firestore + Auth)",
      value: "backup:create"
    },
    {
      name: "Restore Backup (Firestore + Auth)",
      value: "backup:restore",
      disabled: true
    }
  ];
  if (availableBackups.length) {
    prompts[2].disabled = false;
  }
  return prompts;
  //{ name: "Rules: Deploy", value: "firestore:rules:deploy" },
  //{ name: "Indexes: Deploy", value: "firestore:indexes:deploy" },
  //{ name: "Indexes: Download", value: "firestore:indexes:download" }
}
