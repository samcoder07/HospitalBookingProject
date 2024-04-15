import express from 'express';
import { deleteDoctor, updatedDoctor, getAllDoctor, getSingleDoctor } from '../Controllers/doctor.Controller.js';
import { authentication, restrict } from '../auth/verifyToken.js';
const router = express.Router();

router.get('/:id', getSingleDoctor)
router.get('/', getAllDoctor)
router.put('/:id', authentication, restrict(['doctor']), updatedDoctor)
router.delete('/:id', authentication, restrict(['doctor']), deleteDoctor)

export default router;