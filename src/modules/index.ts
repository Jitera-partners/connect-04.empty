
import { HealthCheckModule } from './health-check/health-check.module';
import { AttendanceModule } from '../modules/attendance/attendance.module';
import { EmployeesModule } from '../modules/employees/employees.module';
import { TimeEntriesModule } from './time-entries/time-entries.module';
import { PermissionsModule } from './permissions/permissions.module';

export default [HealthCheckModule, AttendanceModule, EmployeesModule, TimeEntriesModule, PermissionsModule];
