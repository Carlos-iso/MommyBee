import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MommyService } from '../modules/mommy/mommy.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly mommyService: MommyService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: { name: string; email: string; cpf: string; password: string; username?: string }) {
    const existing = await this.mommyService.findByEmail(dto.email);
    if (existing) throw new ConflictException('E-mail já cadastrado');

    const existingCpf = await this.mommyService.findByCpf(dto.cpf);
    if (existingCpf) throw new ConflictException('CPF já cadastrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const mommy = await this.mommyService.create({
      name: dto.name,
      email: dto.email,
      cpf: dto.cpf,
      username: dto.username,
      password: hashedPassword,
    });

    return this.generateToken(mommy);
  }

  async login(dto: { email: string; password: string }) {
    const mommy = await this.mommyService.findByEmail(dto.email);
    if (!mommy) throw new UnauthorizedException('E-mail ou senha inválidos');

    const passwordMatch = await bcrypt.compare(dto.password, mommy.password);
    if (!passwordMatch) throw new UnauthorizedException('E-mail ou senha inválidos');

    return this.generateToken(mommy);
  }

  private generateToken(mommy: any) {
    const payload = { sub: mommy._id, email: mommy.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: mommy._id,
        name: mommy.name,
        email: mommy.email,
        username: mommy.username,
        isSeller: mommy.isSeller,
        sellerId: mommy.sellerId,
      },
    };
  }

  async getProfile(userId: string) {
    const mommy = await this.mommyService.findById(userId);
    if (!mommy) throw new UnauthorizedException('Usuário não encontrado');
    const { password, ...result } = mommy;
    return result;
  }

  async updateProfile(userId: string, dto: any) {
    return this.mommyService.update(userId, dto);
  }
}
