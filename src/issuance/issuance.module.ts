import { Module } from '@nestjs/common';
import { IssuanceController } from './issuance.controller';
import { IssuanceService } from './issuance.service';
import { PrismaService } from 'prisma/prisma-service.service';
import { OutOfBandIssuance } from './templates/out-of-band-issuance.template';

@Module({
  imports: [],
  controllers: [IssuanceController],
  providers: [IssuanceService, PrismaService, OutOfBandIssuance],
})
export class IssuanceModule {}
