import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import logger from '../lib/logger';
import type { TestimonialInput } from '../schemas/testimonial.schema';

export const testimonialController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const testimonials = await prisma.testimonial.findMany();
    logger.info('Retrieved all testimonials');
    res.json({
      status: 'success',
      data: testimonials
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    
    if (!testimonial) {
      throw new AppError(404, 'Testimonial not found');
    }

    logger.info(`Retrieved testimonial with id: ${id}`);
    res.json({
      status: 'success',
      data: testimonial
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as TestimonialInput;
    const testimonial = await prisma.testimonial.create({ data });
    
    logger.info(`Created new testimonial with id: ${testimonial.id}`);
    res.status(201).json({
      status: 'success',
      data: testimonial
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as TestimonialInput;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data
    });

    logger.info(`Updated testimonial with id: ${id}`);
    res.json({
      status: 'success',
      data: testimonial
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    
    logger.info(`Deleted testimonial with id: ${id}`);
    res.status(204).send();
  }),
};