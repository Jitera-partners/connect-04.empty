import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../entities/permissions.ts';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsService],
  exports: [PermissionsService]
})
export class PermissionsModule {}

// Additional module-related logic can be added here if necessary

