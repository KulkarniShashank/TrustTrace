import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PrismaService } from 'prisma/prisma-service.service';
import { HttpService } from '@nestjs/axios/dist';
dotenv.config();
import * as QRCode from 'qrcode';
import { sendEmail } from 'send-grid-helper-file';
import { OutOfBandIssuance } from './templates/out-of-band-issuance.template';

@Injectable()
export class IssuanceService {
  private readonly httpService = new HttpService();
  constructor(
    private readonly prisma: PrismaService,
    private readonly outOfBandIssuances: OutOfBandIssuance,
  ) {}

  async outOfBandIssuance(email: string): Promise<any> {
    try {
      const farmerDetails = await this.prisma.farmer.findUnique({
        where: { email: email },
      });

      const productDetails = await this.prisma.product.findFirst({
        where: {
          name: 'rice',
        },
      });
      const outOfBandIssuancePayload = {
        protocolVersion: 'v2',
        credentialFormats: {
          anoncreds: {
            attributes: [
              {
                name: 'farmer_name',
                value: farmerDetails.name,
              },
              {
                name: 'farmer_id',
                value: farmerDetails.id,
              },
              {
                name: 'product_id',
                value: productDetails?.id,
              },
              {
                name: 'product_name',
                value: productDetails?.name,
              },
            ],
            credentialDefinitionId: process.env.CREDENTIAL_DEFINITION_ID,
          },
        },
        autoAcceptCredential: 'always',
        label: farmerDetails?.name,
      };

      const agentEndpoint = `${process.env.AGENT_ENDPOINT}/credentials/create-offer-oob`;
      const agentToken = process.env.AGENT_TOKEN;
      const credentialCreateOfferDetails = await this._outOfBandCredentialOffer(
        outOfBandIssuancePayload,
        agentEndpoint,
        agentToken,
      );

      const invitationId: string =
        credentialCreateOfferDetails.response?.invitation['@id'];
      const connectionUrl = `${process.env.AGENT_ENDPOINT}/url/${invitationId}`;

      const qrCodeOptions = { type: 'image/png' };
      const outOfBandIssuanceQrCode = await QRCode.toDataURL(
        connectionUrl,
        qrCodeOptions,
      );

      const emailHtml = this.outOfBandIssuances.outOfBandIssuance(
        email,
        farmerDetails?.name,
        connectionUrl,
      );

      const emailAttachments = [
        {
          filename: 'qrcode.png',
          content: outOfBandIssuanceQrCode.split(';base64,')[1],
          contentType: 'image/png',
          disposition: 'attachment',
        },
      ];
      const emailData = {
        emailFrom: process.env.EMAIL_FROM,
        emailTo: email,
        emailSubject: `Platform: Issuance of Your Credential`,
        emailHtml,
        emailAttachments,
      };
      const isEmailSent = await sendEmail(emailData);
      return isEmailSent;
    } catch (error) {
      throw error;
    }
  }

  async _outOfBandCredentialOffer(
    outOfBandIssuancePayload,
    url: string,
    token: string,
  ): Promise<any> {
    try {
      const sendOutOfbandCredentialOffer = await this.httpService.post(
        url,
        outOfBandIssuancePayload,
        {
          headers: { authorization: token },
        },
      );
      return sendOutOfbandCredentialOffer;
    } catch (error) {
      throw error;
    }
  }
}
