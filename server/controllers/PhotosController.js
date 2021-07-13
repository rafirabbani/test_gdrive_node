import googleAuth from '../auth/GoogleAuth'

const { drive } = googleAuth

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

export default {
    getFiles
}