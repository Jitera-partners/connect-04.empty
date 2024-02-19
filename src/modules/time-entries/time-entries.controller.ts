
import {
  Controller,
  Post,
  Put,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UnprocessableEntityException,
  Param,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidateTimeEntryDto } from './dto/validate-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import { TimeEntriesService } from './time-entries.service';
import { PermissionsService } from '../permissions/permissions.service';

@Controller('api/time-entries')
export class TimeEntriesController {
  constructor(
    private readonly timeEntriesService: TimeEntriesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Post('validate')
  @UseGuards(NestAuthGuard())
  @HttpCode(HttpStatus.OK)
  async validateTimeEntry(@Body() validateTimeEntryDto: ValidateTimeEntryDto) {
    try {
      await this.timeEntriesService.validateTimeEntry(validateTimeEntryDto);
      return { status: HttpStatus.OK, message: 'Time entry data is valid.' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Use error.message instead of error.response as response is private
        throw new UnprocessableEntityException(error.message);
      }
      throw error;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateTimeEntry(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTimeEntryDto: UpdateTimeEntryDto
  ) {
    try {
      const user = // Get the authenticated user from the request context (not shown in the example)
      const hasPermission = await this.permissionsService.checkEditTimeEntryPermission(user.id, user.role);
      if (!hasPermission) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      const updatedTimeEntry = await this.timeEntriesService.updateTimeEntry({
        id, ...updateTimeEntryDto
      });
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
