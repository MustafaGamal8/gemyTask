import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import logger from '../lib/logger';
import type { PricingPlanInput } from '../schemas/pricingPlan.schema';

export const pricingPlanController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const pricingPlans = await prisma.pricingPlan.findMany();
    logger.info('Retrieved all pricing plans');
    res.json({
      status: 'success',
      data: pricingPlans
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const pricingPlan = await prisma.pricingPlan.findUnique({ where: { id } });
    
    if (!pricingPlan) {
      throw new AppError(404, 'Pricing plan not found');
    }

    logger.info(`Retrieved pricing plan with id: ${id}`);
    res.json({
      status: 'success',
      data: pricingPlan
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as PricingPlanInput;
    const pricingPlan = await prisma.pricingPlan.create({ data });
    
    logger.info(`Created new pricing plan with id: ${pricingPlan.id}`);
    res.status(201).json({
      status: 'success',
      data: pricingPlan
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as PricingPlanInput;

    const pricingPlan = await prisma.pricingPlan.update({
      where: { id },
      data
    });

    logger.info(`Updated pricing plan with id: ${id}`);
    res.json({
      status: 'success',
      data: pricingPlan
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.pricingPlan.delete({ where: { id } });
    
    logger.info(`Deleted pricing plan with id: ${id}`);
    res.status(204).send();
  }),
};