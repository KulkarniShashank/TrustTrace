import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { AddProduct } from '../dtos/add-product.dto';
import { abi } from 'config';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();
import * as QRCode from 'qrcode';

@Injectable()
export class ProductService {
  async addProduct(addProduct: AddProduct): Promise<any> {
    const url = process.env.URL;
    const contrctAdress = process.env.CONTRACT_ADDRESS;
    const provider = new ethers.providers.JsonRpcProvider(url);
    const wallet: ethers.Wallet = new ethers.Wallet(
      '0x66bfee94000659e9527ee9f318e409227bcd9e322873e619225e25c15fc3ecc7',
      provider,
    );
    const registry: ethers.Contract = new ethers.Contract(
      contrctAdress,
      abi,
      wallet,
    );
    const productDetailId = uuidv4();
    const productDetails = await registry.addProductDetails(
      '0xa2AFe49863a7Cc55aF783872A1532B80bf1f6BF9',
      productDetailId,
      addProduct.productDetailPayload,
    );
    return productDetails;
  }

  async getProductByProductDetailsId(
    productId: string,
    productDetailsId: string,
  ): Promise<any> {
    const url = process.env.URL;
    const contrctAdress = process.env.CONTRACT_ADDRESS;
    const provider = new (ethers as any).providers.JsonRpcProvider(url);
    const registry: ethers.Contract = new ethers.Contract(
      contrctAdress,
      abi,
      provider,
    );
    const productDetails = await registry.getProduct(
      productId,
      productDetailsId,
    );
    return productDetails;
  }

  async getProductDetails(productId: string): Promise<any> {
    const url = process.env.URL;
    const contrctAdress = process.env.CONTRACT_ADDRESS;
    const provider = new (ethers as any).providers.JsonRpcProvider(url);
    const registry: ethers.Contract = new ethers.Contract(
      contrctAdress,
      abi,
      provider,
    );
    const productDetails = await registry.getProduct(productId);
    return productDetails;
  }

  async generateQrCode(
    productId: string,
    productName: string,
  ): Promise<string> {
    const jsonData = {
      productId,
      productName,
    };
    const jsonString = JSON.stringify(jsonData);
    try {
      const qrCode = await QRCode.toDataURL(jsonString);
      return qrCode;
    } catch (error) {
      throw error;
    }
  }
}
