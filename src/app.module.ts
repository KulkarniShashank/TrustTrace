import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { IssuanceModule } from './issuance/issuance.module';
import { CREDEBLAuthTokenModule } from './CREDEBL-Auth/auth.token.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [
    ProductModule,
    AuthModule,
    IssuanceModule,
    CREDEBLAuthTokenModule,
    VendorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
