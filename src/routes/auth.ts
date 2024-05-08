import { Router } from 'express';
import { login, refresh } from '@hackatone/controllers';

const router = Router();


router.route('/login').post(login);

router.route('/refresh').post(refresh);

export default router;