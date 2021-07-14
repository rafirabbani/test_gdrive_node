import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import googleAuth from '../auth/GoogleAuth'

const { drive } = googleAuth
const pathDir = path.join(process.cwd(), '/uploads/')

//Get Files List from Gdrive
const getFiles  = async (req, res) => {
  try {
    const result = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    })
    if (result) {
      return res.send(result.data.files)
    }
    else {
      return res.status(400).send('No files found')
    }
  }
  catch (err) {
    console.error('Error', err)
    return res.status(500).send('Something Went Wrong')
  }
}

//Upload Files to Gdrive
const uploadFiles = async (req, res) => {
  //Make Temp Upload Folder on Local Machine
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  // Handle File Using Formidable
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: pathDir
  })
  
  form
      .on('fileBegin', async (keyName, file) => {
        file.path = path.join(pathDir, file.name)
      })
      .on('end', () => {
        console.log('File Uploaded on Local Machine')
      })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send('Bad Request')
    }

    //Create Meta Data and Request Body for Google Drive API
    const fileMetaData = {
      name: files.photos.name
    }
    const media = {
      mimeType: files.photos.type,
      body: fs.createReadStream(files.photos.path)
    }

    //Upload File from Local Machine To Google Drive
    try {
      const result = await drive.files.create({
        resource: fileMetaData,
        media: media,
        fields: 'id, name, mimeType, webContentLink'
      })
      if (result) {
        //Delete file from local machine
        fs.unlinkSync(files.photos.path)
        return res.send(result.data)
      }
      else {
        return res.status(500).send('Upload to Google Drive Failed')
      }
    }
    catch (err) {
      console.error(err)
      return res.status(500).send('Something Went Wrong')
    }
  })
}

const downloadFiles = async (req, res) => {
  try {
    const result = await drive.files.get({
      fileId: req.params.fileId,
      fields: 'id, name, mimeType, webContentLink'
    })
    if (result) {
      return res.send(result.data)
    }
    else {
      return res.status(404).send('File Not Found')
    }
  }
  catch (err) {
    console.error(err)
    return res.status(500).send('Something Went Wrong')
  }
}

export default {
    getFiles,
    uploadFiles,
    downloadFiles
}