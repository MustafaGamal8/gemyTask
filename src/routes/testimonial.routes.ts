import { Router } from 'express';
import { testimonialController } from '../controllers/testimonial.controller';
import { validate } from '../middleware/validate';
import { testimonialSchema } from '../schemas/testimonial.schema';

const router = Router();

router.get('/', testimonialController.getAll);
router.get('/:id', testimonialController.getOne);
router.post('/', validate(testimonialSchema), testimonialController.create);
router.put('/:id', validate(testimonialSchema), testimonialController.update);
router.delete('/:id', testimonialController.delete);

export { router as testimonialRoutes };