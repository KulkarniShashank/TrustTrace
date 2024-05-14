import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get all vendor data',
    description: 'Get all vendor data.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async vendorDetails(@Res() res: Response): Promise<Response> {
    const getvendorData = await this.vendorService.vendorDetails();

    const finalResponse = {
      statusCode: HttpStatus.OK,
      message: 'Vendor archive successfully',
      data: getvendorData,
    };

    return res.status(HttpStatus.OK).json(finalResponse);
  }
}
