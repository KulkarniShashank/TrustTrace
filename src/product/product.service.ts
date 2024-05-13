import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { AddProduct } from '../dtos/add-product.dto';
import { abi } from 'config';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ProductService {
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
        '0x14cb91F35B1B1e95FF9e69593614967480E5758F',
        productDetailId,
        JSON.stringify(addProduct.productDetailPayload),
      );
      const productDetailsResponse = {
        productTxDetails: productDetails,
        productTnxId: productDetailId,
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
}
