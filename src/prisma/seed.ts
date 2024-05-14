import * as fs from 'fs';

import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = new Logger('Init seed DB');

const configData = fs.readFileSync(
  `${process.cwd()}/prisma/data/trust-trace-master-table.json`,
  'utf8',
);
const createVendor = async (): Promise<void> => {
  try {
    const existVendor = await prisma.vendor.findMany();

    if (0 === existVendor.length) {
      const { vendorData } = JSON.parse(configData);
      const vendorDetails = await prisma.vendor.createMany({
        data: vendorData,
      });

      logger.log(vendorDetails);
    } else {
      logger.log('Already seeding in vendor');
    }
  } catch (e) {
    logger.error('An error occurred seeding vendorDetails:', e);
  }
};

const createProduct = async (): Promise<void> => {
  try {
    const existProduct = await prisma.product.findMany();

    if (0 === existProduct.length) {
      const { productData } = JSON.parse(configData);
      const productDetails = await prisma.product.createMany({
        data: productData,
      });

      logger.log(productDetails);
    } else {
      logger.log('Already seeding in product');
    }
  } catch (e) {
    logger.error('An error occurred seeding product:', e);
  }
};

async function main(): Promise<void> {
  await createVendor();
  await createProduct();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(`In prisma seed initialize`, e);
    await prisma.$disconnect();
    process.exit(1);
  });
