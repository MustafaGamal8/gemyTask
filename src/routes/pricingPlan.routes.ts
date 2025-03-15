import { Router } from 'express';
import { pricingPlanController } from '../controllers/pricingPlan.controller';
import { validate } from '../middleware/validate';
import { pricingPlanSchema } from '../schemas/pricingPlan.schema';

const router = Router();

router.get('/', pricingPlanController.getAll);
router.get('/:id', pricingPlanController.getOne);
router.post('/', validate(pricingPlanSchema), pricingPlanController.create);
router.put('/:id', validate(pricingPlanSchema), pricingPlanController.update);
router.delete('/:id', pricingPlanController.delete);

export { router as pricingPlanRoutes };