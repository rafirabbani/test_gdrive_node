import { Router } from 'express'
import IndexControllers from '../controllers/IndexController'

const photos = IndexControllers.PhotosController
const router = Router()

router.get('/list', photos.getFiles)
router.post('/upload', photos.uploadFiles)

export default router

