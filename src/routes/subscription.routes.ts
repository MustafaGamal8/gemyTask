import { Router } from 'express';
import { subscriptionController } from '../controllers/subscription.controller';
import { validate } from '../middleware/validate';
import { subscriptionSchema } from '../schemas/subscription.schema';

const router = Router();

router.get('/', subscriptionController.getAll);
router.get('/:id', subscriptionController.getOne);
router.post('/', validate(subscriptionSchema), subscriptionController.create);
router.put('/:id', validate(subscriptionSchema), subscriptionController.update);
router.delete('/:id', subscriptionController.delete);

export { router as subscriptionRoutes };