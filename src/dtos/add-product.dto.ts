import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddProduct {
  @ApiProperty()
  @IsNotEmpty({ message: 'productDetailPayload is required' })
  productDetailPayload: object;
}
