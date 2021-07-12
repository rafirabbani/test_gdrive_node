import fs from 'fs'
import { google } from 'googleapis'
import path from 'path'

const SCOPES = ['https://www.googleapis.com/auth/drive']
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
        getToken(oauth2Client)
    }
}

const getToken = (oauth2Client) => {
    console.log('get the token 1st')
    /* const authUrl = oauth2Client.generateUrl({
        access_type: 'offline',
        scope: SCOPES
    }) */
}




export default {
    readCredentials,
    auth
}