import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Hero
  await prisma.hero.create({
    data: {
      image: 'https://example.com/hero-image.jpg'
    }
  });

  // Seed Feature
  await prisma.feature.create({
    data: {
      name: 'Amazing Feature',
      description: 'This is an amazing feature that will help your business grow.',
      image: 'https://example.com/feature-image.jpg'
    }
  });

  // Seed Service
  await prisma.service.create({
    data: {
      title: 'Premium Service',
      description: 'A premium service for premium customers',
      image: 'https://example.com/service-image.jpg',
      options: {
        includes: ['Option 1', 'Option 2', 'Option 3'],
        availability: '24/7',
        support: true
      }
    }
  });

  // Seed Testimonial
  await prisma.testimonial.create({
    data: {
      author: 'John Doe',
      content: 'This service is amazing! Highly recommended.',
      rating: 5
    }
  });

  // Seed PricingPlan
  await prisma.pricingPlan.create({
    data: {
      name: 'Basic Plan',
      price: 29.99,
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    }
  });

  // Seed BlogPost
  await prisma.blogPost.create({
    data: {
      title: 'Getting Started',
      content: 'This is a comprehensive guide to getting started...',
      image: 'https://example.com/blog-image.jpg',
      tags: ['guide', 'tutorial', 'beginners']
    }
  });

  // Seed Subscription
  await prisma.subscription.create({
    data: {
      email: 'example@email.com'
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });