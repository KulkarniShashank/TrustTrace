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
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5WHczQ3hCc2ZBNG5xT0ZWWElhUjhMeWZ5cHNXU1NMLTQ3NVluckNVSDJJIn0.eyJleHAiOjE3MTU3MjgwODgsImlhdCI6MTcxNTY5OTI4OCwianRpIjoiOThlMWFlNTktYTcxNy00YjM5LTk1NzEtNDllOTZhZDJiYWJjIiwiaXNzIjoiaHR0cHM6Ly9pZHAtZGV2LmNyZWRlYmwuaWQvcmVhbG1zL2NyZWRlYmxfcGxhdGZvcm0iLCJzdWIiOiJkYjMwOGE4ZC1lYmUxLTQ1Y2QtODljMy01Y2ZhYTMzODk2OGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbkNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJkYTEzMDhhYS03MmM1LTQzZDMtOGRhNC03N2ExNDQ3ZmYyMjUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vaWRwLWRldi5jcmVkZWJsLmlkLyoiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlZGl0X29yZ2FuaXphdGlvbiBlbWFpbCIsInNpZCI6ImRhMTMwOGFhLTcyYzUtNDNkMy04ZGE0LTc3YTE0NDdmZjIyNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU2hhc2hhbmsgS3Vsa2FybmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzaGFzaGFuay5rdWxrYXJuaUBheWFud29ya3MuY29tIiwiZ2l2ZW5fbmFtZSI6IlNoYXNoYW5rIiwiZmFtaWx5X25hbWUiOiJLdWxrYXJuaSIsImVtYWlsIjoic2hhc2hhbmsua3Vsa2FybmlAYXlhbndvcmtzLmNvbSJ9.kQkCy2M6Qj7wuzfX7CEYur3MDaSEXEoLkENdzRgCzk9mErQuJ2joF8zgEfc9A5A7aiSkIhciaqYhpN-DO6Qc7dFRGSUOvFoHpPoRtDBoiSN7etfy3raesOQQgyWgzML1TtqF0KxnMk1OmyeRrbRAgESiEUr5PRn34KXUdYDScRurpev1iXWBpo1J9x8rRib2zw_ajjl4HtOxd2qWWAOq_V7RJQxxpXZks-eL4oFZqfjnHphNOWYlYlt6Yw1h85Xa6xgwVTB6MYwixDLKXWq1O3kxrYRkkXgiUWzcX6lU_6xU1TtYWaW4tLrAnBoCz-fzISINFa7z6BOWsJf3zC0cJQ';
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
