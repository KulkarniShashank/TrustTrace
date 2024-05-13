import { Module } from '@nestjs/common';
import { IssuanceController } from './issuance.controller';
import { IssuanceService } from './issuance.service';
import { PrismaService } from '@src/prisma/prisma-service.service';
import { OutOfBandIssuance } from './templates/out-of-band-issuance.template';
import { CREDEBLAuthTokenModule } from '@src/CREDEBL-Auth/auth.token.module';

@Module({
  imports: [CREDEBLAuthTokenModule],
  controllers: [IssuanceController],
  providers: [IssuanceService, PrismaService, OutOfBandIssuance],
})
export class IssuanceModule {}
