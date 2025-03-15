import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { heroRoutes } from './routes/hero.routes';
import { featureRoutes } from './routes/feature.routes';
import { serviceRoutes } from './routes/service.routes';
import { testimonialRoutes } from './routes/testimonial.routes';
import { pricingPlanRoutes } from './routes/pricingPlan.routes';
import { blogPostRoutes } from './routes/blogPost.routes';
import { subscriptionRoutes } from './routes/subscription.routes';
import { errorHandler } from './middleware/errorHandler';
import logger from './lib/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Routes
app.use('/api/heroes', heroRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/pricing-plans', pricingPlanRoutes);
app.use('/api/blog-posts', blogPostRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

export default app;