import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register User',
    description: 'Register User.',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async register(@Body() farmer, @Res() res: Response) {
    await this.authService.register(farmer);
    const finalResponse = {
      statusCode: HttpStatus.CREATED,
      message: 'User register successfully',
    };

    return res.status(HttpStatus.CREATED).json(finalResponse);
  }

  @Post('login')
  async login(@Body() farmer, @Res() res: Response) {
    await this.authService.login(farmer);
    const finalResponse = {
      statusCode: HttpStatus.CREATED,
      message: 'Login successfully',
    };
    return res.status(HttpStatus.CREATED).json(finalResponse);
  }
}
