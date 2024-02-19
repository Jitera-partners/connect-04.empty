import {
  Controller,
  Put,
  Param,
  Body,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsService } from '../permissions/permissions.service';

@Controller('api/time-entries')
export class TimeEntriesController {
  constructor(
    private readonly timeEntriesService: TimeEntriesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateTimeEntry(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTimeEntryDto: UpdateTimeEntryDto,
  ) {
    try {
      const user = // Get the authenticated user from the request context (not shown in the example)
      const hasPermission = await this.permissionsService.checkEditTimeEntryPermission(user.id, user.role);
      if (!hasPermission) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      const updatedTimeEntry = await this.timeEntriesService.updateTimeEntry(id, updateTimeEntryDto);
      return {
        status: HttpStatus.OK,
        time_entry: updatedTimeEntry,
      };
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
