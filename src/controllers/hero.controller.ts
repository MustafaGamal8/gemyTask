import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import logger from '../lib/logger';
import type { HeroInput } from '../schemas/hero.schema';

export const heroController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const heroes = await prisma.hero.findMany();
    logger.info('Retrieved all heroes');
    res.json({
      status: 'success',
      data: heroes
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const hero = await prisma.hero.findUnique({ where: { id } });
    
    if (!hero) {
      throw new AppError(404, 'Hero not found');
    }

    logger.info(`Retrieved hero with id: ${id}`);
    res.json({
      status: 'success',
      data: hero
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as HeroInput;
    const hero = await prisma.hero.create({ data });
    
    logger.info(`Created new hero with id: ${hero.id}`);
    res.status(201).json({
      status: 'success',
      data: hero
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as HeroInput;

    const hero = await prisma.hero.update({
      where: { id },
      data
    });

    logger.info(`Updated hero with id: ${id}`);
    res.json({
      status: 'success',
      data: hero
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.hero.delete({ where: { id } });
    
    logger.info(`Deleted hero with id: ${id}`);
    res.status(204).send();
  }),
};