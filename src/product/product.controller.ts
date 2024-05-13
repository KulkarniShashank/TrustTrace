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
    const productRespose = await this.productService.addProduct(addProduct);

    const finalResponse = {
      statusCode: HttpStatus.CREATED,
      message: 'Product added successfully',
      data: productRespose,
    };

    return res.status(HttpStatus.CREATED).json(finalResponse);
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
    const productById = await this.productService.getProductByProductDetailsId(
      productId,
      productDetailId,
    );

    const finalResponse = {
      statusCode: HttpStatus.OK,
      message: 'Product retrieve successfully',
      data: productById,
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
    const productDetails =
      await this.productService.getProductDetails(productId);

    const finalResponse = {
      statusCode: HttpStatus.OK,
      message: 'Product retrieve successfully',
      data: productDetails,
    };

    return res.status(HttpStatus.OK).json(finalResponse);
  }

  @Get('/')
  @ApiOperation({
    summary: 'generateProductId',
    description: 'generateProductId',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async generateProductId(@Res() res: Response): Promise<Response> {
    const productDetails = await this.productService.generateProductId();

    const finalResponse = {
      statusCode: HttpStatus.OK,
      message: 'Product Id generated successfully',
      data: productDetails,
    };

    return res.status(HttpStatus.OK).json(finalResponse);
  }
}
