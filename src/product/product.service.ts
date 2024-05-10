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
    const url = process.env.URL;
    const contrctAdress = process.env.CONTRACT_ADDRESS;

    // const config = {
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5WHczQ3hCc2ZBNG5xT0ZWWElhUjhMeWZ5cHNXU1NMLTQ3NVluckNVSDJJIn0.eyJleHAiOjE3MTUzNzUwOTIsImlhdCI6MTcxNTM0NjI5MSwianRpIjoiNDBlZmY0OGUtNjVlZC00N2FhLTllZDQtZmRlYzdkZDQyMzUzIiwiaXNzIjoiaHR0cHM6Ly9pZHAtZGV2LmNyZWRlYmwuaWQvcmVhbG1zL2NyZWRlYmxfcGxhdGZvcm0iLCJzdWIiOiJkYjMwOGE4ZC1lYmUxLTQ1Y2QtODljMy01Y2ZhYTMzODk2OGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbkNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJjM2Q2NzI3MC03YzFhLTRiYzYtOTNhYi1mYzE0N2U5YzdlOGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vaWRwLWRldi5jcmVkZWJsLmlkLyoiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlZGl0X29yZ2FuaXphdGlvbiBlbWFpbCIsInNpZCI6ImMzZDY3MjcwLTdjMWEtNGJjNi05M2FiLWZjMTQ3ZTljN2U4ZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU2hhc2hhbmsgS3Vsa2FybmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzaGFzaGFuay5rdWxrYXJuaUBheWFud29ya3MuY29tIiwiZ2l2ZW5fbmFtZSI6IlNoYXNoYW5rIiwiZmFtaWx5X25hbWUiOiJLdWxrYXJuaSIsImVtYWlsIjoic2hhc2hhbmsua3Vsa2FybmlAYXlhbndvcmtzLmNvbSJ9.pJVNFUeleat6lkEA55U5yWlYF2Jdm5-Jy_ttN8OLcg3Lbc1vjIqpPoVWBXCOO1hdv0AzJLQKuLAvRkbFo0AeiO1iDq9JoDV9QbxfV5lXOsrTGOTrx5-w5sC2VEoSmHWNRyk8N9pGlYgGnDQUgWjIgLu97B7cxAakednX7LNoy3lNo_bZgfHLg0Rl6eDKtG4Mcv94xJpAGxc6ImHuYUE4qJm4WN0dJQoIS2_GruqVY3Ng0A2t4gzulMlv3rRsCdss8rz7iP-tApqc-okW_vSqvSG-U75q2_Km9wkiLIzCWGOC4mlyH0PvV60y5W1SHajUwvzd9vHOxh8JL-gOu9aebw`,
    //   },
    // };
    // const response = await axios.post(
    //   'https://devapi.credebl.id/orgs/092019b7-8f27-4741-bc25-b414137c416a/agents/polygon/create-keys',
    //   config,
    // );
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
}
