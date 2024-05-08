import { Router } from 'express';
import posts from './post';
import users from './user';

const router = Router();

router.use('/posts', posts);
router.use('/users', users);

export default router;