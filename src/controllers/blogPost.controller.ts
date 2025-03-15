import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import logger from '../lib/logger';
import type { BlogPostInput } from '../schemas/blogPost.schema';

export const blogPostController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const blogPosts = await prisma.blogPost.findMany();
    logger.info('Retrieved all blog posts');
    res.json({
      status: 'success',
      data: blogPosts
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const blogPost = await prisma.blogPost.findUnique({ where: { id } });
    
    if (!blogPost) {
      throw new AppError(404, 'Blog post not found');
    }

    logger.info(`Retrieved blog post with id: ${id}`);
    res.json({
      status: 'success',
      data: blogPost
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as BlogPostInput;
    const blogPost = await prisma.blogPost.create({ data });
    
    logger.info(`Created new blog post with id: ${blogPost.id}`);
    res.status(201).json({
      status: 'success',
      data: blogPost
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as BlogPostInput;

    const blogPost = await prisma.blogPost.update({
      where: { id },
      data
    });

    logger.info(`Updated blog post with id: ${id}`);
    res.json({
      status: 'success',
      data: blogPost
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.blogPost.delete({ where: { id } });
    
    logger.info(`Deleted blog post with id: ${id}`);
    res.status(204).send();
  }),
};