import { Router } from 'express';
import { featureController } from '../controllers/feature.controller';
import { validate } from '../middleware/validate';
import { featureSchema } from '../schemas/feature.schema';

const router = Router();

router.get('/', featureController.getAll);
router.get('/:id', featureController.getOne);
router.post('/', validate(featureSchema), featureController.create);
router.put('/:id', validate(featureSchema), featureController.update);
router.delete('/:id', featureController.delete);

export { router as featureRoutes };