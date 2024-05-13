import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import CREDEBLAuthTokenService from './auth-token';

@Module({
  imports: [HttpModule, CacheModule],
  providers: [CREDEBLAuthTokenService],
  exports: [CREDEBLAuthTokenService],
})
export class CREDEBLAuthTokenModule {}
