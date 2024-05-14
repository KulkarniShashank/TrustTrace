import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'productId is required' })
  productId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'productName is required' })
  productName: string;
}
