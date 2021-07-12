import path from 'path'
import googleAuth from '../auth/GoogleAuth'
import { google } from 'googleapis'

const { auth, readCredentials } = googleAuth
const credsPath = path.join(process.cwd(), '/server/auth/secret/credentials.json' )


//read files metadata
const a = () => {
    const drive = google.drive({
        version: 'v3',
        auth: auth(readCredentials(credsPath)),
    });
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            console.log(`${file.name} (${file.id})`);
          });
        } else {
          console.log('No files found.');
        }
      });
}

export default {
    a
}