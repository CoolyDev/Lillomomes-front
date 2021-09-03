import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {TokenStorageService} from '@modules/auth/services/tokenstorageservice.service';

import {EmployeesService} from '@modules/employees/services/employees.service';
import {SBSortableHeaderDirective, SortEvent} from '@modules/tables/directives';
import {from, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as fs from 'file-saver';
import {Employees} from "@modules/employees/models";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'employee-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-table.component.html',
  styleUrls: ['employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {

  searchText: string | undefined;
  employee$!: Observable<Employees[]>;
  archiveEmployee$!: Observable<Employees[]>;
  artivEmployee$!: Observable<Employees[]>;
  display: boolean | undefined
  total$!: Observable<number>;
  sortedColumn!: string;
  sortedDirection!: string;
  closeResult: string | undefined;
  ellipsis=faEllipsisV;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  employeeId: string | undefined;
  allEmployees: any[] = [];
  activEmployees: any= [];
  excelDataToExport: any[] = []
  exelImportTab: any[] = []
  lastnameCbx: boolean = true;
  firstNameCbx: boolean = true;
  genreCbx: boolean = true;
  emailCbx: boolean = true;
  roleCbx: boolean = true;
  phone1Cbx: boolean = true;
  phone2Cbx: boolean = true;
  files: File[] = [];
  page: number = 1;
  @Input() pageSize = 4;
  collectionSize: any;
  activEmp:  any=[]
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdmin = false;
  showUser = false;
  private roles: string[] = [];
  username?: string;
  currentUser?:any[];
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public employeesService: EmployeesService,
    private tokenStorageService:TokenStorageService,
    public router: Router,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.roles=user.roles;
      this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
      this.showAdmin = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');}
    this.employeesService.getAllEmployees()
    this.employeesService.pageSize = this.pageSize;
    this.employee$ = this.employeesService.employees$;
    this.employee$.subscribe((e:any)=>{
      this.allEmployees=e
    })
    this.total$ = this.employeesService.total$;
  }

  onSort({column, direction}: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;
    this.employeesService.sortColumn = column;
    this.employeesService.sortDirection = direction;
    this.changeDetectorRef.detectChanges();
  }
  editEmployee(employee:Employees) {
    this.router.navigateByUrl('employees/edit-employee/' + employee.id);
  }

  archiveEmployeeModal(targetModal: any, employee: any) {
    this.employeeId = employee.id
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  /*    filter checkbox*/

  filterName(event: any) {
    if (event.target.checked) {
      this.lastnameCbx = true
    } else {
      this.lastnameCbx = false
    }
  }

  filterFirstName(event: any) {
    console.log(event)
    if (event.target.checked) {
      this.firstNameCbx = true
    } else {
      this.firstNameCbx = false
    }
  }

  filterEmail(event: any) {
    if (event.target.checked) {
      this.emailCbx = true
    } else {
      this.emailCbx = false
    }
  }

  filterRole(event: any) {
    if (event.target.checked) {
      this.roleCbx = true
    } else {
      this.roleCbx = false
    }
  }

  filterPhone1(event: any) {
    if (event.target.checked) {
      this.phone1Cbx = true
    } else {
      this.phone1Cbx = false
    }
  }

  filterPhone2(event: { target: any }) {
    if (event.target.checked) {
      this.phone2Cbx = true
    } else {
      this.phone2Cbx = false
    }
  }

  viewEmployee(employee: any) {
    this.router.navigateByUrl('employees/employee-details/' + employee.id);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {
      this.closeResult = `Close with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by Pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public downloadPDF(): void {

    var tableEmployeeExport: any[] = [];

    this.employee$?.subscribe(e => {
      e.forEach(emp => {
        var empTempObj: any = [];
        empTempObj.push(emp.firstName);
        empTempObj.push(emp.lastName);
        empTempObj.push(emp.jobRole);
        empTempObj.push(emp.businessPhone);
        empTempObj.push(emp.privatePhone);
        tableEmployeeExport.push(empTempObj);
      })
    });
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['First name', 'Last name', 'Role', 'Business phone', 'Private phone']],
      body: tableEmployeeExport,

    });
    doc.save("EmployeeReport.pdf");
  }

  downloadExcel() {
    this.allEmployees?.map((emp:Employees)=>{
      this.excelDataToExport?.push({
        "firstName":emp.firstName,
        "lastName":emp.lastName,
        "jobRole":emp.jobRole,
        "businessPhone":emp.businessPhone,
        "privatePhone":emp.privatePhone,})
    })
    this.employeesService.exportExcel(this.excelDataToExport, 'Employee');
  }

  onSelect(event: any) {
/*

        this.files.push(...event.addedFiles);
        readXlsxFile(this.files[0]).then((rows:any) => {
          rows.forEach((item: any, i: number)=> {
            if(i !== 0) {
              this.exelImportTab.push(item)
            };
          })
         // console.log(this.exelImportTab)
          console.log(constructObject(this.exelImportTab))
        })
        const constructObject = (arr: any[]) => {
          return arr.reduce((acc: { [x: string]: any; }, val: [any, any]) => {
            const [key, value] = val;
            acc[key] = value;
            return acc;
          }, {});
        };
*/
    let workBook: { SheetNames: any[]; Sheets: { [x: string]: any; }; } | null = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.addedFiles[0];
   reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook?.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
     console.log(jsonData[workBook?.Sheets[name]])
     jsonData[workBook?.Sheets[name]].map((emp:any)=>{
       this.employeesService.createEmployee(emp)
     })
    }
    reader.readAsBinaryString(file);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  changeDisplay() {
    this.display=!this.display
  }

  displayActivEmp() {
    this.employeesService.getActivEmployees(true)
  }
  displayArchEmp() {
    this.employeesService.getActivEmployees(false)
  }

  archiveEmp(employees: Employees) {
    employees.status=!employees.status
    this.employeesService.pacthEmployee(employees,employees.id)
    this.modalService.dismissAll();
  }
}
