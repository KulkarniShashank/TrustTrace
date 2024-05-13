import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AddProduct } from 'src/dtos/add-product.dto';
import { ProductDto } from 'src/dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Add product',
    description: 'Add product.',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async addProduct(
    @Body() addProduct: AddProduct,
    @Res() res: Response,
  ): Promise<Response> {
    await this.productService.addProduct(addProduct);

    const finalResponse = {
      statusCode: HttpStatus.CREATED,
      message: 'Product added successfully',
    };

    return res.status(HttpStatus.CREATED).json(finalResponse);
  }

  @Post('/qr')
  @ApiOperation({
    summary: 'Get product QR',
    description: 'Get product QR',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async ProductQR(@Body() productDto: ProductDto, @Res() res: Response) {
    console.log('productDto----', productDto);
    const qrCode = await this.productService.generateQrCode(
      productDto.productId,
      productDto.productName,
    );

    res.setHeader('Content-Type', 'image/png');

    if (productDto.productId && productDto.productName) {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${productDto.productName}.png`,
      );
    }

    res.send(Buffer.from(qrCode.split(',')[1], 'base64'));
  }

  @Get('/:productDetailId/:productId')
  @ApiOperation({
    summary: 'Get product by product details id',
    description: 'Get product by product details id.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async getProductByProductDetailsId(
    @Param('productDetailId') productDetailId: string,
    @Param('productId') productId: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.productService.getProductByProductDetailsId(
      productId,
      productDetailId,
    );

    const finalResponse = {
      statusCode: HttpStatus.OK,
      message: 'Product retrieve successfully',
    };

    return res.status(HttpStatus.OK).json(finalResponse);
  }

  @Get('/:productId')
  @ApiOperation({
    summary: 'Get all products',
    description: 'Get all products',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async getProductDetails(
    @Param('productId') productId: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.productService.getProductDetails(productId);

    const finalResponse = {
      statusCode: HttpStatus.OK,
      message: 'Product retrieve successfully',
    };

    return res.status(HttpStatus.OK).json(finalResponse);
  }
}
