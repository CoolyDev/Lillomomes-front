import { ContactTablesComponent } from './employees-table-container/contact-tables.component'
import {EmployeeEditConteners} from "@modules/employees/containers/employee-edit-container/employee-editConteners";
import {EmployeeDetailsConteners} from "@modules/employees/containers/employee-details-container/employee-detailsConteners";
import { EmployeesProfilContainer } from './employees-profil-container/employees-profil.component';

export const EmployeesContainers = [ContactTablesComponent,EmployeeDetailsConteners,EmployeeEditConteners,EmployeesProfilContainer];


export * from './employees-table-container/contact-tables.component'
export * from './employee-edit-container/employee-editConteners'
export * from './employee-details-container/employee-detailsConteners'
export * from './employees-profil-container/employees-profil.component'