import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PrismaService } from '@src/prisma/prisma-service.service';
import axios from 'axios';
import CREDEBLAuthTokenService from '@src/CREDEBL-Auth/auth-token';
dotenv.config();

@Injectable()
export class IssuanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly credeblAuthTokenService: CREDEBLAuthTokenService,
  ) {}

  async outOfBandIssuance(email: string): Promise<any> {
    // const token = await this.credeblAuthTokenService.serviceAuthentication();
    // console.log(token);
    try {
      const farmerDetails = await this.prisma.farmer.findUnique({
        where: { email },
      });

      const productDetails = await this.prisma.product.findFirst({
        where: {
          name: 'Rice',
        },
      });
      const orgId = process.env.ORG_ID;
      const sendOutOfbandCredentialOfferUrl = `${process.env.CREDEBL_URL}/orgs/${orgId}/credentials/oob/email`;
      const credentialOffer = [
        {
          attributes: [
            {
              value: farmerDetails.id,
              name: 'farmerId',
              isRequired: true,
            },
            {
              value: farmerDetails.name,
              name: 'farmerName',
              isRequired: true,
            },
            {
              value: productDetails.id,
              name: 'productId',
              isRequired: true,
            },
            {
              value: productDetails.name,
              name: 'productName',
              isRequired: true,
            },
          ],
          emailId: email,
        },
      ];
      const oobCredentialIssuance = {
        credentialDefinitionId: process.env.CREDENTIAL_DEFINITION_ID,
        credentialOffer,
      };
      const sendOutOfBand = await this._outOfBandCredentialOffer(
        sendOutOfbandCredentialOfferUrl,
        oobCredentialIssuance,
      );
      return sendOutOfBand;
    } catch (error) {
      throw error;
    }
  }

  async _outOfBandCredentialOffer(
    sendOutOfbandCredentialOfferUrl,
    credentialOffer,
  ): Promise<any> {
    try {
      const token = await this.credeblAuthTokenService.serviceAuthentication();
      // console.log(token);
      const response = await axios
        .post(sendOutOfbandCredentialOfferUrl, credentialOffer, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
