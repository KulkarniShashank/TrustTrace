import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PrismaService } from '@src/prisma/prisma-service.service';
dotenv.config();

@Injectable()
export class VendorService {
  constructor(private readonly prisma: PrismaService) {}

  async vendorDetails(): Promise<
    {
      id: string;
      name: string;
      location: string;
      email: string;
      mobile: string;
    }[]
  > {
    try {
      const getVendorData = await this.prisma.vendor.findMany();
      return getVendorData;
    } catch (error) {
      throw error;
    }
  }
}
