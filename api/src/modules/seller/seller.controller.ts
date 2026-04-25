import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ApplySellerDto, UpdateSellerDto } from './dto/seller.dto';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // Candidatar-se a vendedor
  @UseGuards(AuthGuard('jwt'))
  @Post('apply')
  async apply(@CurrentUser() user: any, @Body() dto: ApplySellerDto) {
    return this.sellerService.apply(user.id, dto);
  }

  // Ver meu status de vendedor
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyStatus(@CurrentUser() user: any) {
    return this.sellerService.getMySeller(user.id);
  }

  // Dashboard do vendedor (aprovado)
  @UseGuards(AuthGuard('jwt'))
  @Get('dashboard/:sellerId')
  async getDashboard(@Param('sellerId') sellerId: string) {
    return this.sellerService.getMyDashboard(sellerId);
  }

  // Atualizar dados da loja
  @UseGuards(AuthGuard('jwt'))
  @Put('me')
  async update(@CurrentUser() user: any, @Body() dto: UpdateSellerDto) {
    const seller = await this.sellerService.getMySeller(user.id);
    if (!seller) return { error: 'Seller not found' };
    return this.sellerService.updateMyProfile(seller._id, dto);
  }

  // Listar vendedores pendentes (admin futura)
  @UseGuards(AuthGuard('jwt'))
  @Get('pending')
  async findAllPending() {
    return this.sellerService.findAllPending();
  }

  // Aprovar vendedor
  @UseGuards(AuthGuard('jwt'))
  @Put(':sellerId/approve')
  async approve(@Param('sellerId') sellerId: string) {
    return this.sellerService.approve(sellerId);
  }

  // Rejeitar vendedor
  @UseGuards(AuthGuard('jwt'))
  @Put(':sellerId/reject')
  async reject(@Param('sellerId') sellerId: string) {
    return this.sellerService.reject(sellerId);
  }
}
