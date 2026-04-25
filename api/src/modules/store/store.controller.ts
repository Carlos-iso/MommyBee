import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@CurrentUser() user: any, @Body() dto: CreateStoreDto) {
    return this.storeService.create(user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyStore(@CurrentUser() user: any) {
    return this.storeService.findBySellerId(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':storeId')
  async getStore(@Param('storeId') storeId: string) {
    return this.storeService.findById(storeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('me')
  async update(@CurrentUser() user: any, @Body() dto: UpdateStoreDto) {
    return this.storeService.update(user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/dashboard')
  async getDashboard(@CurrentUser() user: any) {
    return this.storeService.getDashboard(user.id);
  }
}
