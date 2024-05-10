// farmer.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class FarmerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isVerified: boolean;
}
