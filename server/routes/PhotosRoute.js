import { Router } from 'express'
import IndexControllers from '../controllers/IndexController'

const photos = IndexControllers.PhotosController
const router = Router()

router.use('/list', photos.getFiles)

export default router

