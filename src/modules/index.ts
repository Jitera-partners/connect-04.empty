import { HealthCheckModule } from './health-check/health-check.module'
import { EmployeesModule } from './employees/employees.module'
// EmployeesModule is already included, no changes required.

export default [HealthCheckModule, EmployeesModule]
