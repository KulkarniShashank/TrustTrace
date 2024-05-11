import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FarmerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'mobile is required' })
  mobile: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'address is required' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'isVerified is required' })
  isVerified: boolean;
}
