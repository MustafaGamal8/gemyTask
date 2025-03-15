import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import logger from '../lib/logger';
import type { ServiceInput } from '../schemas/service.schema';

export const serviceController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const services = await prisma.service.findMany();
    logger.info('Retrieved all services');
    res.json({
      status: 'success',
      data: services
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const service = await prisma.service.findUnique({ where: { id } });
    
    if (!service) {
      throw new AppError(404, 'Service not found');
    }

    logger.info(`Retrieved service with id: ${id}`);
    res.json({
      status: 'success',
      data: service
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as ServiceInput;
    const service = await prisma.service.create({ data });
    
    logger.info(`Created new service with id: ${service.id}`);
    res.status(201).json({
      status: 'success',
      data: service
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as ServiceInput;

    const service = await prisma.service.update({
      where: { id },
      data
    });

    logger.info(`Updated service with id: ${id}`);
    res.json({
      status: 'success',
      data: service
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    
    logger.info(`Deleted service with id: ${id}`);
    res.status(204).send();
  }),
};