import { Router } from 'express';
import { authenticate } from '@hackatone/middleware';
import auth from './auth';
import apiPrivate from './api';
import posts from './public';

import cookieParser from 'cookie-parser';

const router = Router();

router.use('/auth', cookieParser(), auth);
router.use('/api', posts);
router.use('/api', authenticate, apiPrivate);

export default router;