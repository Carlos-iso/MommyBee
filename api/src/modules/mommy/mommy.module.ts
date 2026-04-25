import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MommyController } from './mommy.controller';
import { MommyService } from './mommy.service';
import { MommyRepository } from './mommy.repository';
import { MommySchema } from './schemas/mommy.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Mommy', schema: MommySchema }])],
  controllers: [MommyController],
  providers: [MommyService, MommyRepository],
  exports: [MommyService, MommyRepository, MongooseModule],
})
export class MommyModule {}
