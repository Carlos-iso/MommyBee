import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { IsCpf } from '../../../auth/decorators/is-cpf.decorator';

export class ApplySellerDto {
  @IsNotEmpty({ message: 'Nome da loja é obrigatório' })
  @IsString()
  storeName: string;

  @IsOptional()
  @IsString()
  storeDescription?: string;

  @IsCpf({ message: 'CPF inválido' })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString()
  cpf: string;
}

export class UpdateSellerDto {
  @IsOptional()
  @IsString()
  storeName?: string;

  @IsOptional()
  @IsString()
  storeDescription?: string;
}
