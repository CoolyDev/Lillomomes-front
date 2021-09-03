import { EmployeeTableComponent } from './employees-table/employee-table.component';
import { SortIconComponent } from './sort-icon/sort-icon.component';
import {EmployeesDetailsComponent} from "@modules/employees/components/employees-details/employees-details.component";
import {EmployeesProfilComponent} from "@modules/employees/components/employees-profil/employees-profil.component";
export const Employeescomponents = [EmployeeTableComponent, SortIconComponent,EmployeesDetailsComponent,EmployeesProfilComponent];
// export const EmployeeDetailsComponents = [];
// export const EmployeeEditComponent = [EmployeesDetailsComponent];
// export const EmployeesProfilComponents = [];

export * from './employees-table/employee-table.component';
export * from './employees-edit/edit-employee.component';
export * from './sort-icon/sort-icon.component';
export * from './employees-profil/employees-profil.component';