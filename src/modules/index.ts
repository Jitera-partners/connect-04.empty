import { HealthCheckModule } from './health-check/health-check.module';
import { AttendanceModule } from './attendance/attendance.module'; // Ensure this module is present
import { EmployeesModule } from './employees/employees.module';
import { TimeEntriesModule } from './time-entries/time-entries.module';
import { PermissionsModule } from './permissions/permissions.module';

export default [
    HealthCheckModule,
    AttendanceModule,
    EmployeesModule,
    TimeEntriesModule,
    PermissionsModule
];
