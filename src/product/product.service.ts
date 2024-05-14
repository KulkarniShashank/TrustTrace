import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { AddProduct } from '../dtos/add-product.dto';
import { abi } from 'config';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { HttpService } from '@nestjs/axios';
dotenv.config();
import * as QRCode from 'qrcode';

@Injectable()
export class ProductService {
  private readonly httpService = new HttpService();
  async addProduct(addProduct: AddProduct): Promise<any> {
    try {
      const url = process.env.URL;
      const contractAddress = process.env.CONTRACT_ADDRESS;
      if (!url || !contractAddress) {
        throw new Error('URL or contract address is not provided.');
      }
      const provider = new ethers.providers.JsonRpcProvider(url);
      const wallet: ethers.Wallet = new ethers.Wallet(
        process.env.OWNER_PRIVATE_KEY,
        provider,
      );
      const registry: ethers.Contract = new ethers.Contract(
        contractAddress,
        abi,
        wallet,
      );
      const productDetailId = uuidv4();
      const productDetails = await registry.addProductDetails(
        addProduct.productId,
        productDetailId,
        JSON.stringify(addProduct.productDetailPayload),
      );
      const productDetailsResponse = {
        productTxDetails: productDetails,
        productTnxId: productDetailId,
        productId: addProduct.productId,
      };
      return productDetailsResponse;
    } catch (error) {
      console.error('Error in addProduct:', error);
      throw error;
    }
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
    return JSON.parse(productDetails);
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

    const productDetails = await registry.getAllProduct(productId);
    const linkedResourceMetadata = productDetails.map((element: string) => {
      return JSON.parse(element);
    });
    return linkedResourceMetadata;
  }

  async generateProductId(): Promise<any> {
    try {
      const url = `${process.env.AGENT_ENDPOINT}/polygon/create-keys`;
      const accessToken = process.env.AGENT_TOKEN;
      const generateTokenResponse = await this.httpService
        .post(url, {}, { headers: { authorization: accessToken } })
        .toPromise();
      const generateToken = generateTokenResponse.data;
      return generateToken;
    } catch (error) {
      console.error('Error generating product ID:', error.message);
      throw error; // Re-throw the error to handle it elsewhere
    }
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
