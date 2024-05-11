import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { IssuanceService } from './issuance.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('issuance')
export class IssuanceController {
  constructor(private readonly issuanceService: IssuanceService) {}

  @Post('/:email')
  @ApiOperation({
    summary: 'Out of band issuance',
    description: 'Out of band issuance.',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async outOfBandIssuance(
    @Param('email') email: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.issuanceService.outOfBandIssuance(email);

    const finalResponse = {
      statusCode: HttpStatus.CREATED,
      message: 'Email send successfully',
    };

    return res.status(HttpStatus.CREATED).json(finalResponse);
  }
}
