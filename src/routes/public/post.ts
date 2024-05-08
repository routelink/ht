import { Router } from 'express';
import { posts, create, remove, update } from '@hackatone/controllers';

const router = Router();


router.route('/').get(posts);

export default router;