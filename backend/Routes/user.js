import express from 'express';
import { deleteUser, updatedUser, getAllUser, getSingleUser } from '../Controllers/userController.js';
import { authentication, restrict } from '../auth/verifyToken.js';
const router = express.Router();

router.get('/:id', authentication, restrict(['patient']), getSingleUser)
router.get('/', authentication, restrict(['admin']), getAllUser)
router.put('/:id', authentication, restrict(['patient']), updatedUser)
router.delete('/:id', authentication, restrict(['patient']), deleteUser)

export default router;