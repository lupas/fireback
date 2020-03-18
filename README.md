# 🔥 Fireback 🔥

<p align="center"><img align="center" height="250px" src="https://fireback.netlify.com/logo.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/fireback"><img src="https://badgen.net/npm/dm/fireback" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/fireback"><img src="https://badgen.net/npm/v/fireback" alt="Version"></a>
  <a href="https://www.npmjs.com/package/fireback"><img src="https://badgen.net/npm/license/fireback" alt="License"></a>
 </p>
</p>

> Firebase Backup CLI that makes backing up and restoring Firebase services a breeze.

This Node.js modules helps you backing up and restoring your Firebase services such as Firebase Firestore or Authentication in a breeze.

📖 [**Read Full Documentation**](https://fireback.netlify.com/)

## ‼️‼️ IMPORTANT - DISCLAIMER ‼️‼️

‼️ Please **DO NOT use this applciation if you are not aware what effects backups and restores to your Firebase data might have**.

If you do it without being careful, you might end up with **high Firebase bills**, **data loss** or other painful experiences.

We do not take any responsibility for any damage the use of this module might do to your data or your billing records.

That being said, the application is meant to simplify the process of backing up and restoring Firebase data and if used wisely should not pose any risk to your Firebase projects. Just be careful :)

## Requirements

- Make sure you have **Node.js installed** on your system (the newer, the better).
- Make sure that all projects you use this tool with have **billing enabled** (Blaze Plan+).

## Setup

1. Install fireback globally:

```js
npm i -g fireback
// or
yarn global add fireback
```

2. Create a file called `fireback.config.mjs` in the folder where your firebase.json is located.

3. Configure `fireback.config.mjs`:

```js
export default {
  // Projects you want to backup from / restore to
  projects: ["test1-project", "test2-project", "test3-project"]
};
```

## Run

To run the CLI tool, simply enter `fireback` in your CLI where your `fireback.config.mjs` is located.

```bash
fireback
```

The following screen should appear:

![startscreen](https://fireback.netlify.com/startscreen.png "Start Screen")
