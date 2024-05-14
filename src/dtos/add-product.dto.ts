import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddProduct {
  @ApiProperty()
  @IsNotEmpty({ message: 'productDetailPayload is required' })
  productDetailPayload: object;

  @ApiProperty()
  @IsNotEmpty({ message: 'productAddress is required' })
  productAddress: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'farmerEmail is required' })
  farmerEmail: string;
}
