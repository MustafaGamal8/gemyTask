import { Router } from 'express';
import { serviceController } from '../controllers/service.controller';
import { validate } from '../middleware/validate';
import { serviceSchema } from '../schemas/service.schema';

const router = Router();

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getOne);
router.post('/', validate(serviceSchema), serviceController.create);
router.put('/:id', validate(serviceSchema), serviceController.update);
router.delete('/:id', serviceController.delete);

export { router as serviceRoutes };