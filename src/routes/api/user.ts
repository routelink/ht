import { Router } from 'express';
import { Register, users } from '@hackatone/controllers';

const router = Router();

router.route('/').get(users);

router.route('/').post(Register);

export default router;