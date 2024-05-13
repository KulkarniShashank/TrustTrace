import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { lastValueFrom, map } from 'rxjs';
import { CommonConstants } from '@src/common/constants';
import {
  AuthTokenRequest,
  RequestConfig,
} from '@src/CREDEBL-Auth/dto/client-credential-token-payload.dto';
import { AuthTokenResponse } from '@src/CREDEBL-Auth/dto/auth-token-res.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CREDEBLEndpoints } from '@src/common/constants';
import { CredeblRestResponse } from '@src/common/response';

@Injectable()
export default class CREDEBLAuthTokenService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly httpService: HttpService,
  ) {}

  async serviceAuthentication(): Promise<string> {
    const authToken: string | undefined = await this.cacheService.get(
      CommonConstants.CREDEBL_ACCESS_TOKEN_KEY,
    );

    if (authToken) {
      console.log('Access token: found');
      return `${authToken}`;
    }

    const url = `${process.env.CREDEBL_URL}${CREDEBLEndpoints.ORG_PREFIX}${process.env.CREDEBL_USER}/token`;
    const payload: AuthTokenRequest = {
      clientSecret: process.env.CREDEBL_PASS,
    };
    const tokenResponse: AuthTokenResponse = await lastValueFrom(
      this.httpService
        .post(url, payload)
        .pipe(map((response) => response.data)),
    )
      .then((data: CredeblRestResponse) =>
        plainToInstance(AuthTokenResponse, data.data),
      )
      .catch((error) => {
        console.log(error);
        throw new HttpException(
          'Error while creating token',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    await this.cacheService.set(
      CommonConstants.CREDEBL_ACCESS_TOKEN_KEY,
      `${tokenResponse.tokenType} ${tokenResponse.accessToken}`,
      tokenResponse.expiresIn * CommonConstants.millisecondToSecond -
        CommonConstants.minusTokenExpiryTimeInSeconds *
          CommonConstants.millisecondToSecond,
    );
    console.log(`Token stored in cache`);
    return `${tokenResponse.tokenType} ${tokenResponse.accessToken}`;
  }

  getRequestConfig(token: string): RequestConfig {
    return {
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    };
  }
}
