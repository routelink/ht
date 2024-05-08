import { Router } from 'express';
import { posts, create, remove, update } from '@hackatone/controllers';

const router = Router();

router.route('/').post(create);

router.route('/:id').delete(remove);

router.route('/:id').patch(update);

export default router;