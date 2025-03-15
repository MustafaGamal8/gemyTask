import { Router } from 'express';
import { blogPostController } from '../controllers/blogPost.controller';
import { validate } from '../middleware/validate';
import { blogPostSchema } from '../schemas/blogPost.schema';

const router = Router();

router.get('/', blogPostController.getAll);
router.get('/:id', blogPostController.getOne);
router.post('/', validate(blogPostSchema), blogPostController.create);
router.put('/:id', validate(blogPostSchema), blogPostController.update);
router.delete('/:id', blogPostController.delete);

export { router as blogPostRoutes };