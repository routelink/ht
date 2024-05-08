import { Router } from 'express';
import posts from './post';

const router = Router();

router.use('/posts', posts);

export default router;