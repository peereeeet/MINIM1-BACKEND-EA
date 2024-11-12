import { Router } from 'express';
import * as sessionTimesController from '../controller/tiempoUsoController';

const router = Router();

router.post('/sessionTimes', sessionTimesController.createSessionTime);
router.get('/sessionTimes/:userId', sessionTimesController.getSessionTimes);
router.put('/sessionTimes/:id', sessionTimesController.updateSessionTime);
router.delete('/sessionTimes/:id', sessionTimesController.deleteSessionTime);

export default router;
