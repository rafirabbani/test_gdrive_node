import { Router } from 'express'
import IndexControllers from '../controllers/IndexController'

const user = IndexControllers.UserController
const router = Router()

router.post('/create', user.createUser)
router.get('/', user.getAllUser)

export default router