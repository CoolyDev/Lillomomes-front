import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";
import {CoursesService} from '@modules/courses/services/courses.service';
import {Courses, Employees, Teacher} from '@modules/employees/models';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './courses-card.component.html',
    styleUrls: ['courses-card.component.scss'],
})
export class CoursesCardContainer implements OnInit {
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  private roles: string[] = [];
  username?: string;
  currentUser?:any[];
  page: number = 1;
  @Input() pageSize = 4;
  collectionSize: any;
  private course$?: Observable<Courses[]>;
  total$!: Observable<number>;
  private coursesList: any;
  files: File[] = [];
  closeResult: string | undefined;

  constructor(private courseServices:CoursesService,
              private modalService: NgbModal,
              private router:Router,
              private tokenStorageService:TokenStorageService) {}
    ngOnInit() {
      this.courseServices.pageSize = this.pageSize;
      this.course$ = this.courseServices.course$;

      this.course$.subscribe((e:any)=>{
        console.log(e)
        this.coursesList=e
      })
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.username = user.username;
        this.roles=user.roles;
        this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
        this.showAdminComp = this.roles.includes('ROLE_ADMIN');
        /*this.tokenStorageService.roleEmitted.subscribe( user => {
          this.currentUser?.push(user)
          this.currentUser?.map(u=>{
            this.roles=u['roles']
          })
          this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
          this.showAdminComp = this.roles.includes('ROLE_ADMIN');
        })*/
      }
    }
  deleteCourses() {
    this.modalService.dismissAll();
   // this.employeesService.deleteEmployee(this.employeeId)
  }
  planCourse(course: any) {
    this.router.navigateByUrl('courses/courses-planner/' + course.idCourses);
  }
  editCourse(course: any) {
    console.log(course)
    this.router.navigateByUrl('courses/edit-course/' + course.idCourses);
  }
  archiveCourses(employees: Employees) {
   // employees.isArchived=!employees.isArchived
    //this.employeesService.pacthEmployee(employees,employees.id)
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

  onSelect(event: { addedFiles: any; }) {
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

      jsonData['data'].forEach((course:any)=>{

        this.courseServices.createCourse(course)
      })
    }
    reader.readAsBinaryString(file);
  }
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
