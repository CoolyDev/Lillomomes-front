import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {faEye, faAddressBook} from '@fortawesome/free-solid-svg-icons';
import {StudentService} from '@modules/student/services/students.service';
import {SBSortableHeaderDirective, SortEvent} from '@modules/tables/directives';
import {Country} from '@modules/tables/models';
import {CountryService} from '@modules/tables/services';
import {Observable} from 'rxjs';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Students} from "@modules/student/models";
//import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Employees} from "@modules/employees/models";
import * as XLSX from "xlsx";
import { TokenStorageService } from '@modules/auth/services/tokenstorageservice.service';

@Component({
  selector: 'student-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-table.component.html',
  styleUrls: ['student-table.component.scss'],
})
export class StudentTableComponent implements OnInit {

  student$!: Observable<Students[]>;
  total$!: Observable<number>;
  sortedColumn!: string;
  sortedDirection!: string;
  @Input() pageSize = 20;
  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
  closeResult: string | undefined;
  files: File[] = [];
  /*my cbx*/
  lastNameCbx: boolean = true;
  genderCbx: boolean = true;
  firstNameCbx: boolean = true;
  genreCbx: boolean = true;
  emailCbx: boolean = true;
  phone1Cbx: boolean = true;
  cityCbx: boolean = true;
  classCbx: boolean = true;
  searchText: string | undefined;
  allStudents: Students [] | undefined;
  page = 1;
  excelDataToExport: any[] = []
  studentId: string | undefined;
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
    public studentService: StudentService,
    private modalService: NgbModal,
    public router: Router,private tokenStorageService:TokenStorageService
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
        this.studentService.pageSize = this.pageSize;
        this.student$ = this.studentService.student$;
        this.student$.subscribe((student:any)=>{
          this.allStudents=student
        })
    this.total$ = this.studentService.total$;
  }

  onSort({column, direction}: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;
    this.studentService.sortColumn = column;
    this.studentService.sortDirection = direction;
    this.changeDetectorRef.detectChanges();
  }

  getAllStudenty() {
    /*this.studentService
      .getAllStudents()
      .subscribe(
        (stud: any) => {
          this.allStudents = stud
          console.log(this.allStudents);
        })
    this.allStudents?.map((student: any) => {
      this.excelDataToExport?.push({
        "firstname": student.firstName,
        "lastname": student.lastName,
        "jobRole": student.gender,
        "businessPhone": student.email,
        "privatePhone": student.phone1,
        "residence": student.cityOfResidence,
        "course": student.course,
      })
    })*/
  }

  deleteStudentModal(targetModal: any, student: any) {
    this.studentId = student.code
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  deleteStudent() {
    this.modalService.dismissAll();
    this.studentService.deleteStudent(this.studentId)
  }

  viewStudent(student: Students) {
    this.router.navigateByUrl('students/student-details/' + student.code);
  }

  editStudent(student: Students) {
    this.router.navigateByUrl('students/student-edit/' + student.code);
  }

  /*Dropzone function*/
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

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
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
      jsonData['data'].forEach((student:any)=>{
        this.studentService.createStudent(student)
      })
    }
    reader.readAsBinaryString(file);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  /*filter checkbox*/
  filterName(event: any) {
    console.log(event)
    if (event.target.checked) {
      this.lastNameCbx = true
    } else {
      this.lastNameCbx = false
    }
  }

  filterGender(event: any) {
    console.log(event)
    if (event.target.checked) {
      this.genderCbx = true
    } else {
      this.genderCbx = false
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

  filterPhone1(event: any) {
    if (event.target.checked) {
      this.phone1Cbx = true
    } else {
      this.phone1Cbx = false
    }
  }

  filterCity(event: any) {
    if (event.target.checked) {
      this.cityCbx = true
    } else {
      this.cityCbx = false
    }
  }

  filterClass(event: { target: any }) {
    if (event.target.checked) {
      this.classCbx = true
    } else {
      this.classCbx = false
    }
  }

  downloadPDF() {
    var tableStudentExport: any[] = [];
    this.studentService.studentExport$?.subscribe(e => {
      console.log(e)
     e.forEach(student=>{
       var studentTempObj: any = [];
       studentTempObj.push(student.firstName);
       studentTempObj.push(student.lastName);
       studentTempObj.push(student.gender);
       studentTempObj.push(student.email);
       studentTempObj.push(student.phone1);
       studentTempObj.push(student.city);
       studentTempObj.push(student.course)
       tableStudentExport.push(studentTempObj);
     })
    });
    const doc = new jsPDF();
  autoTable(doc,{
      head: [['First name', 'Last name', 'Sex', 'Email', 'Phone 1', 'City', 'Course']],
      body: tableStudentExport,
     /* headerStyles: {
        lineWidth: 1,
        fillColor: 'blue',
      }*/
    });
    doc.save("StudentReport.pdf");
  }
  downloadExcel() {
    this.allStudents?.map((student:Students)=>{
      this.excelDataToExport?.push({
        "firstName":student.firstName,
        "lastName":student.lastName,
        "gender":student.gender,
        "email":student.email,
        "phone1":student.phone1,
        "city":student.city,
        "course":student.course,
      })
    })
    this.studentService.exportExcel(this.excelDataToExport, 'Students');
  }
}
