import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import logger from '../lib/logger';
import type { FeatureInput } from '../schemas/feature.schema';

export const featureController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const features = await prisma.feature.findMany();
    logger.info('Retrieved all features');
    res.json({
      status: 'success',
      data: features
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const feature = await prisma.feature.findUnique({ where: { id } });
    
    if (!feature) {
      throw new AppError(404, 'Feature not found');
    }

    logger.info(`Retrieved feature with id: ${id}`);
    res.json({
      status: 'success',
      data: feature
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as FeatureInput;
    const feature = await prisma.feature.create({ data });
    
    logger.info(`Created new feature with id: ${feature.id}`);
    res.status(201).json({
      status: 'success',
      data: feature
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as FeatureInput;

    const feature = await prisma.feature.update({
      where: { id },
      data
    });

    logger.info(`Updated feature with id: ${id}`);
    res.json({
      status: 'success',
      data: feature
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.feature.delete({ where: { id } });
    
    logger.info(`Deleted feature with id: ${id}`);
    res.status(204).send();
  }),
};