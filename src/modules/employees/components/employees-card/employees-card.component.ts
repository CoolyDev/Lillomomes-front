import {Component, Input, OnInit} from '@angular/core';
import {Employees} from "@modules/employees/models";
import {Observable} from "rxjs";
import {EmployeesService} from "@modules/employees/services/employees.service";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { TokenStorageService } from '@modules/auth/services/tokenstorageservice.service';
@Component({
  selector: 'sb-employees-card',
  templateUrl: './employees-card.component.html',
  styleUrls: ['./employees-card.component.scss']
})

export class EmployeesCardComponent implements OnInit {
  @Input() employees: Employees | undefined;
  ellipsis=faEllipsisV;
  employeeId: string | undefined;
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  showUser = false;
  private roles: string[] = [];
  firstName?: string;
  lastName?:string
  constructor(private employeesService:EmployeesService,private tokenStorageService :TokenStorageService,
              private modalService: NgbModal,private router:Router) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      
      this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
      this.showAdminComp = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');

      this.firstName = user.firstName;
      this.lastName = user.lastName;
      console.log(this.roles);
  
    }
  }
  editEmployee(employee:Employees) {
    this.router.navigateByUrl('employees/edit-employee/' + employee.id);
  }

  deleteEmployeeModal(targetModal: any, employee: any) {
    this.employeeId = employee.id
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  viewEmployee(employee: any) {
    this.router.navigateByUrl('employees/employee-details/' + employee.id);
  }

  archiveEmployee(targetModal: any, employees: Employees) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }

  archiveEmp(employees: Employees) {
    employees.status=!employees.status
    this.employeesService.pacthEmployee(employees,employees.id)
    this.modalService.dismissAll();
  }
}
