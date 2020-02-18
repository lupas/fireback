import inquirer from "inquirer";

const ALL_ENVS = ["lab", "prd"];
const ALL_MAIN_COMMANDS = [
  new inquirer.Separator("Firestore"),
  { name: "Backup: Create (incl. Auth)", value: "backup:create" },
  { name: "Backup: Restore (incl. Auth)", value: "backup:restore" },
  { name: "Rules: Deploy", value: "firestore:rules:deploy" },
  { name: "Indexes: Deploy", value: "firestore:indexes:deploy" },
  { name: "Indexes: Download", value: "firestore:indexes:download" }
];

export const inq = inquirer;

export function setPrompts() {
  const promptsObj = {
    /** Checkboxes */
    /************* */
    websiteIds: {
      type: "checkbox",
      name: "websiteIds",
      default: ["koreanji"],
      message: "Choose your website(s):",
      choices: global.config.projects
    },
    envs: {
      type: "checkbox",
      name: "envs",
      default: ["lab"],
      message: "Choose your env(s):",
      choices: ALL_ENVS
    },
    /** Lists ******/
    /************* */
    mainCommand: {
      type: "list",
      name: "mainCommand",
      default: "serve",
      message: "What do you want to do?:",
      choices: ALL_MAIN_COMMANDS,
      pageSize: 99999
    },
    env: {
      type: "list",
      name: "env",
      default: ["lab"],
      message: "Choose env:",
      choices: ALL_ENVS
    },
    projectId: {
      type: "list",
      name: "projectId",
      default: ["empty"],
      message: "Choose project:",
      choices: global.config.projects
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
    specificFunction: {
      type: "input",
      name: "specificFunction",
      message: "Enter specific function or leave empty for all:"
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
