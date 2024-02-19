
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { Permission } from '../../entities/permissions.ts';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsService],
  exports: [PermissionsService],
  controllers: [PermissionsController]
})
export class PermissionsModule {}

// Additional module-related logic can be added here if necessary
