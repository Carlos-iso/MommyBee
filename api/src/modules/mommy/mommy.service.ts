import { Injectable } from '@nestjs/common';
import { MommyRepository } from './mommy.repository';

@Injectable()
export class MommyService {
  constructor(private repo: MommyRepository) {}

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }

  async findByCpf(cpf: string) {
    return this.repo.findByCpf(cpf);
  }

  async findByUsername(username: string) {
    return this.repo.findByUsername(username);
  }

  async create(data: any) {
    return this.repo.create(data);
  }

  async update(id: string, data: any) {
    return this.repo.update(id, data);
  }
}
