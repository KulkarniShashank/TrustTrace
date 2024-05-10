// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { FarmerDto } from '../dtos/farmer.model.dto';
import * as bcrypt from 'bcryptjs'; // Import bcrypt
import { PrismaService } from '../../prisma/prisma-service.service'; // Import PrismaService

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

  async login(farmer: FarmerDto): Promise<string> {
    const farmerDetails = await this.prisma.farmer.findUnique({
      where: { email: farmer.email },
    });
    if (!farmer) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(
      farmerDetails.password,
      farmer.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate token upon successful sign-in
    const token = jwt.sign({ email: farmer.email }, this.jwtSecret, {
      expiresIn: '1d',
    });
    return token;
  }
}
