import { Component, OnInit } from '@angular/core';
import {CoursesService} from '@modules/courses/services/courses.service';
import {EmployeesService} from "@modules/employees/services/employees.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department, Employees, Roles, History, Courses, Institution} from '@modules/employees/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subscription} from "rxjs";
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Component({
  selector: 'sb-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
})
export class EditCoursesComponent implements OnInit {
  selectedCourse:Courses | undefined
  public editCourseForm: FormGroup;
  public createCourseForm: FormGroup;
  id: any
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  private roles: string[] = [];
  email?: string;
  keys = Object.keys;
  eRole = Roles;
  eDepartments = Department;
  public isCollapsed = true;
  private _id$: Subscription | undefined;
  history: any[] = [];
  institution$!: Observable<Institution[]>;
  /*<----Getter of array--->*/
  get courseStatus() {
    if (this.id){return this.editCourseForm.get('courseStatus');}
    else{return this.createCourseForm.get('courseStatus');}
  }
  get frequency() {
    if (this.id){return this.editCourseForm.get('frequency');
    }
    else {return this.createCourseForm.get('frequency');
    }
  }
  get courseType() {
    if (this.id){return this.editCourseForm.get('courseStatus');
    }
    else {return this.createCourseForm.get('courseStatus');
    }
  }
  get courseInstitution() {
    if (this.id){return this.editCourseForm.get('institution');
    }
    else {return this.createCourseForm.get('institution');
    }
  }
  /*<----Getter of array--->*/
    dropdownSettingsInstitution: any;
  constructor(
    private coursesService:CoursesService,
    public activatedRoute:ActivatedRoute,
    public employeesService:EmployeesService,
    public modalService:NgbModal,
    public router:Router,private tokenStorageService:TokenStorageService,
    public fb: FormBuilder
  ) {
    this.editCourseForm = this.fb.group({
      idCourses: new FormControl(''),
      courseLevel: new FormControl('',   Validators.required),
      courseName: new FormControl('',   Validators.required),
      coursePrice: new FormControl('Intensif',   Validators.required),
      courseUnit:new FormControl('',   Validators.required),
      courseStatus:new FormControl('',   Validators.required),
      institution:new FormControl('',   Validators.required),
      courseComment:new FormControl('',   Validators.required),
    });
    this.createCourseForm = this.fb.group({
      courseLevel: new FormControl('',   Validators.required),
      courseName: new FormControl('',   Validators.required),
      coursePrice: new FormControl('Intensif',   Validators.required),
      courseUnit:new FormControl('',   Validators.required),
      courseStatus:new FormControl('',   Validators.required),
      institution:new FormControl('',   Validators.required),
      courseComment:new FormControl('',   Validators.required),
    });
  }
  ngOnInit(): void {
    this.getSelectedCourses()
    this.employeesService.getInstitution()
    this.institution$ = this.employeesService.institution$;
    this.dropdownSettingsInstitution = {
      singleSelection: true,
      idField: 'id',
      textField: 'institutionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      //allowSearchFilter: this.ShowFilter
    };
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
      this.showAdminComp = this.roles.includes('ROLE_ADMIN');
      this.email = user.email;}
  }
    getSelectedCourses(){
      this.id  = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.id){
        this.coursesService.getSelectedCourse(this.id).subscribe(
          ( emp:any)=> {
            this.selectedCourse=emp;
            this.patchCourseForm(emp)
          }
          )
      }
    }
  patchCourseForm(selectedCourse: Courses | Courses) {
    this.editCourseForm!.setValue({
      idCourses: selectedCourse?.idCourses,
      courseLevel: selectedCourse?.courseLevel,
      courseName:selectedCourse?.courseName,
      coursePrice: selectedCourse?.coursePrice,
      courseUnit: selectedCourse?.courseUnit,
      courseStatus: selectedCourse?.courseStatus,
      institution: selectedCourse?.institution,
      courseComment:selectedCourse?.courseComment,
    })
  }
  changeType(event: { value: any; target: { value: any; }; }) {
    if (this.id){
      this.courseType?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
    else {
      this.courseType?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }
  onSubmit(content: any){

  this.modalService.open(content, {
    centered: true,
    backdrop: 'static'
  });
if(this.id){
    if(this.editCourseForm.valid){
      this.coursesService.updateCourse(
          {
            idCourses: this.editCourseForm.value?.idCourses,
            courseLevel: this.editCourseForm.value?.courseLevel,
            courseName:this.editCourseForm.value?.courseName,
            coursePrice: this.editCourseForm.value?.coursePrice,
            courseUnit: this.editCourseForm.value?.courseUnit,
            courseStatus: this.editCourseForm.value?.courseStatus,
            institution: {
              "id": 1,
              "institutionName": "GAL"
            },
            courseComment:this.editCourseForm.value?.courseComment,
          },this.id)
    }
  }
  else {
    if(this.createCourseForm.valid){
      this.coursesService.createCourse(this.createCourseForm?.value)
    }
  }
}

    changeStatus(event: { value: any; target: { value: any; }; }) {
      if (this.id){
        this.courseType?.setValue(event.target?.value, {
          onlySelf: true
        })
      }
      else {
        this.courseType?.setValue(event.target?.value, {
          onlySelf: true
        })
      }
    }
  changeInstitution(event: { value: any; target: { value: any; }; }) {
    if (this.id){
      this.courseInstitution?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
    else {
      this.courseInstitution?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }
  onItemSelect(item: any) {
    console.log(item);
  }
}
