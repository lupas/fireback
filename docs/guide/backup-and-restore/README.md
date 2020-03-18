# Backup & Restore

## Create Backup (Firestore + Auth)

This option creates a Firestore and Authentication backup as follows:

1. Downloads all Authentication users locally to a `AllAuthUsers.json` file
2. Backups your Fxirestore data to a Storage Bucket
3. Downloads all Firestore data from the bucket to a local folder

![backup](https://fireback.netlify.com/backup.png "Backup Logs")

In the end, you will have a folder and files like this:

```
- firebackups
  - (projectId)
     - (firestoreBackupFolderId)
        - ...
     - AllAuthUsers.json
```

This is your Firestore and Authentication data. Keep it safe and store it wherever you want.

## Restore Backup (Firestore + Auth)

After you have at least one backup downloaded locally, you can restore it to any project you want. This option does the following:

1. Uploads your Firestore backup to Firebase Storage
2. Import your Firestore backup from Storage to Firestore
3. Uploads and imports all Authentication users from `AllAuthUsers.json`

‼️ Make sure to select the correct target project. If you do select the wrong project, valuable data might get overwritten. So be careful.

![restore](https://fireback.netlify.com/restore.png "Restore Logs")

## More

This tool was quickly built for myself and is not yet a sophisticated solution at all.

If you like it, please feel free to contribute by improving its messy code or adding further functionality.

I am planning to automating backups for other Firebase services and simplifying the processes even more in the future. Until then I hope it's already useful :).