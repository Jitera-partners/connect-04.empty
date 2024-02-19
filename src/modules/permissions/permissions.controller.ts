import { Controller, Get, Param, ParseIntPipe, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('/api/time-entries/permissions/:userId')
  @UseGuards(AuthGuard)
  async checkEditTimeEntryPermissions(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const hasPermission = await this.permissionsService.checkEditTimeEntryPermission(userId, 'user_role');
      if (hasPermission) {
        return {
          status: HttpStatus.OK,
          permissions: {
            can_edit_time_entries: true
          }
        };
      }
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        throw new HttpException('User does not have permission to edit time entries.', HttpStatus.FORBIDDEN);
      } else if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('An unexpected error occurred on the server.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
