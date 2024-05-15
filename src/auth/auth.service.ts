// auth.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { FarmerDto, FarmerLoginDto } from '../dtos/farmer.model.dto';
import * as bcrypt from 'bcryptjs'; // Import bcrypt
import { PrismaService } from '../prisma/prisma-service.service'; // Import PrismaService

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'trust-trace';
  constructor(private readonly prisma: PrismaService) {}
  async register(farmer: FarmerDto): Promise<{
    id: string;
    name: string;
    email: string;
    mobile: string;
    address: string;
    isVerified: boolean;
  }> {
    const hashedPassword = await bcrypt.hash(farmer.password, 10);
    farmer.password = hashedPassword;
    const createdFarmer = await this.prisma.farmer.create({
      data: farmer,
    });
    return createdFarmer;
  }

  async login(farmer: FarmerLoginDto): Promise<string> {
    const farmerDetails = await this.prisma.farmer.findUnique({
      where: { email: farmer.email },
    });
    if (!farmer) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const getProduct = await this.prisma.product.findFirst({
      where: {
        name: 'Rice',
      },
    });

    if (!getProduct) {
      throw new NotFoundException('Product not found');
    }

    const isValidPassword = await bcrypt.compare(
      farmer.password,
      farmerDetails.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate token upon successful sign-in
    jwt.sign({ email: farmer.email }, this.jwtSecret, {
      expiresIn: '1d',
    });
    return getProduct?.productAddress;
  }
}
