import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import {EmployeesService} from '@modules/employees/services/employees.service';
import {SBSortableHeaderDirective, SortEvent} from '@modules/tables/directives';
import {TeacherService} from '@modules/teachers/services/teacher.service';
import {from, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as fs from 'file-saver';
import {Employees, Teacher} from '@modules/employees/models';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'teacher-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './teacher-table.component.html',
  styleUrls: ['teacher-table.component.scss'],
})
export class TeacherTableComponent implements OnInit {

  searchText: string | undefined;
  display: boolean | undefined
  total$!: Observable<number>;
  sortedColumn!: string;
  sortedDirection!: string;
  closeResult: string | undefined;
  ellipsis=faEllipsisV;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  employeeId: string | undefined;
  allEmployees: any[] = [];
  excelDataToExport: any[] = []
  exelImportTab: any[] = []
  lastnameCbx: boolean = true;
  firstNameCbx: boolean = true;
  genreCbx: boolean = true;
  emailCbx: boolean = true;
  roleCbx: boolean = true;
  phoneCbx: boolean = true;
  files: File[] = [];
  page: number = 1;
  @Input() pageSize = 4;
  collectionSize: any;
  private teacher$?: Observable<Teacher[]>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public teacherService: TeacherService,
    public router: Router,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.teacherService.pageSize = this.pageSize;
    this.teacher$ = this.teacherService.teacher$;
    this.teacher$.subscribe((e:any)=>{
      console.log(e)
      this.allEmployees=e
    })
    //this.total$ = this.teacherService.total$;
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

  deleteEmployee() {
    this.modalService.dismissAll();
  //  this.employeesService.deleteEmployee(this.employeeId)
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

  onSelect(event: any) {
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
        //this.employeesService.createEmployee(emp)
      })
    }
    reader.readAsBinaryString(file);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  public downloadPDF(): void {

    var tableEmployeeExport: any[] = [];

/*    this.employee$?.subscribe(e => {
      e.forEach(emp => {
        var empTempObj: any = [];
        empTempObj.push(emp.firstName);
        empTempObj.push(emp.lastName);
        empTempObj.push(emp.jobRole);
        empTempObj.push(emp.businessPhone);
        empTempObj.push(emp.privatePhone);
        tableEmployeeExport.push(empTempObj);
      })
    });*/
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
 //   this.employeesService.exportExcel(this.excelDataToExport, 'Employee');
  }


  changeDisplay() {
    this.display=!this.display
  }
}
