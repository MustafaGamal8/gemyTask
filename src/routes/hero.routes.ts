import { Router } from 'express';
import { heroController } from '../controllers/hero.controller';
import { validate } from '../middleware/validate';
import { heroSchema } from '../schemas/hero.schema';

const router = Router();

router.get('/', heroController.getAll);
router.get('/:id', heroController.getOne);
router.post('/', validate(heroSchema), heroController.create);
router.put('/:id', validate(heroSchema), heroController.update);
router.delete('/:id', heroController.delete);

export { router as heroRoutes };