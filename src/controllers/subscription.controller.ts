import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import logger from '../lib/logger';
import type { SubscriptionInput } from '../schemas/subscription.schema';

export const subscriptionController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const subscriptions = await prisma.subscription.findMany();
    logger.info('Retrieved all subscriptions');
    res.json({
      status: 'success',
      data: subscriptions
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const subscription = await prisma.subscription.findUnique({ where: { id } });
    
    if (!subscription) {
      throw new AppError(404, 'Subscription not found');
    }

    logger.info(`Retrieved subscription with id: ${id}`);
    res.json({
      status: 'success',
      data: subscription
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as SubscriptionInput;
    const subscription = await prisma.subscription.create({ data });
    
    logger.info(`Created new subscription with id: ${subscription.id}`);
    res.status(201).json({
      status: 'success',
      data: subscription
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as SubscriptionInput;

    const subscription = await prisma.subscription.update({
      where: { id },
      data
    });

    logger.info(`Updated subscription with id: ${id}`);
    res.json({
      status: 'success',
      data: subscription
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.subscription.delete({ where: { id } });
    
    logger.info(`Deleted subscription with id: ${id}`);
    res.status(204).send();
  }),
};