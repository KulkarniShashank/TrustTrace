// farmer.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class FarmerDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the farmer' })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the farmer',
  })
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The mobile number of the farmer',
    required: false,
  })
  mobile?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The address of the farmer',
  })
  address: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the farmer',
  })
  password: string;

  @ApiProperty({ example: true, description: 'Whether the farmer is verified' })
  isVerified: boolean;
}
