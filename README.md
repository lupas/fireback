# 🔥 Fireback 🔥

<p align="center">
  <a href="https://www.npmjs.com/package/fireback"><img src="https://badgen.net/npm/dm/fireback" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/fireback"><img src="https://badgen.net/npm/v/fireback" alt="Version"></a>
  <a href="https://www.npmjs.com/package/fireback"><img src="https://badgen.net/npm/license/fireback" alt="License"></a>
 </p>
</p>

> Firebase Backup CLI that makes backing up and restoring Firebase services a breeze.

This Node.js modules helps you backing up and restoring your Firebase services such as Firebase Firestore or Authentication in a breeze.

Give it a go and feel free to add additional helper functions to the repository!

## ‼️‼️ IMPORTANT - DISCLAIMER ‼️‼️

PLEASE make sure to _understand what this tool does_. We do not recommend you using this tool without learning what it might do with your data.

If you do not, you might end up with **high Firebase bills**, **data loss** or other painful experiences.

‼️ Please **DO NOT use this applciation if you are not aware what effects backups and restores to your Firebase data might have**.

We do not take any responsibility for any damage the use of this module might do to your data or your billing records.

That being said, the application is meant to simplify the process of backing up and restoring Firebase data and if used wisely should not pose any risk to your Firebase projects. Just be careful :)

## Requirements

- Make sure you have **Node.js installed** on your system (the newer, the better).
- Make sure that all projects you use this tool with have **billing enabled** (Blaze Plan+).

## Setup

1. Install fireback in the folder where your firebase.json is located:

```js
npm i fireback
// or
yarn add fireback
```

2. Create a file called `fireback.config.mjs`

3. Configure `fireback.config.mjs`:

```js
export default {
  // Projects you want to backup from / restore to
  projects: ["test1-project", "test2-project", "test3-project"]
};
```

## Run

To run the CLI tool, simply enter `fireback` in your CLI.

```bash
fireback
```

The following screen should appear:

![startscreen](https://github.com/lupas/fireback/blob/master/docs/startscreen.png?raw=true "Start Screen")

### Firestore

#### Create Backup (Firestore + Auth)

This option creates a Firestore and Authentication backup as follows:

1. Downloads all Authentication users locally to a `AllAuthUsers.json` file
2. Backups your Fxirestore data to a Storage Bucket
3. Downloads all Firestore data from the bucket to a local folder

In the end, you will have a folder and files like this:

```
- firebackups
  - (projectId)
     - (firestoreBackupFolderId)
        - ...
     - AllAuthUsers.json
```

This is your Firestore and Authentication data. Keep it safe and store it wherever you want.

#### Restore Backup (Firestore + Auth)

After you have at least one backup downloaded locally, you can restore it to any project you want. This option does the following:

1. Uploads your Firestore backup to Firebase Storage
2. Import your Firestore backup from Storage to Firestore
3. Uploads and imports all Authentication users from `AllAuthUsers.json`

‼️ Make sure to select the correct target project. If you do select the wrong project, valuable data might get overwritten. So be careful.

## More

This tool was quickly built for myself and is not yet a sophisticated solution at all.

If you like it, please feel free to contribute by improving its messy code or adding further functionality.

I am planning to automating backups for other Firebase services and simplifying the processes even more in the future. Until then I hope it's already useful :)
