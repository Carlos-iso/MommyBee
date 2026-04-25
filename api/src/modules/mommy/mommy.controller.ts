import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MommyService } from './mommy.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('mommy')
export class MommyController {
  constructor(private service: MommyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@CurrentUser() mommy: any) {
    return mommy;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post('create')
  async create(@Body() data: any) {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async update(@CurrentUser() mommy: any, @Body() data: any) {
    return this.service.update(mommy.id, data);
  }

  // Rota pública para verificar disponibilidade de username
  @Get('check-username/:username')
  async checkUsername(@Param('username') username: string) {
    const exists = await this.service.findByUsername(username);
    return { available: !exists };
  }
}
