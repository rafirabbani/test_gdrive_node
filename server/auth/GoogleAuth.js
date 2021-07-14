import fs from 'fs'
import { google } from 'googleapis'
import path from 'path'
import readline from 'readline'

const SCOPES = ['https://www.googleapis.com/auth/drive']
const credsPath = path.join(process.cwd(), '/server/auth/secret/credentials.json' )
const tokenPath = path.join(process.cwd(), '/server/auth/secret/token.json')


const readCredentials = (credentialsPath) => {
    if(fs.existsSync(credentialsPath)) {
        const credentials = fs.readFileSync(credentialsPath)
        //console.log(JSON.parse(credentials))
        return JSON.parse(credentials)
    }
    else {
        console.log('creds do not exist')
    }
}
//console.log(a)

const auth = (credentials) => {
    const { client_id, client_secret, redirect_uris } = credentials.web
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    if (fs.existsSync(tokenPath)) {
        const token = fs.readFileSync(tokenPath)
        oauth2Client.setCredentials(JSON.parse(token))
        return oauth2Client     
    }
    else {
        getAccessToken(oauth2Client)
    }
}

const getAccessToken = (oauth2Client) => {
    //console.log('get the token 1st')
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    })
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close()
        oauth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oauth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', tokenPath);
          })
        })
      })
}

const drive = google.drive({
    version: 'v3',
    auth: auth(readCredentials(credsPath)),
});




export default {
    drive
}