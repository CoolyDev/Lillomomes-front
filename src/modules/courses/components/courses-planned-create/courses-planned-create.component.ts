import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '@modules/auth/services/tokenstorageservice.service';
import {Room} from '@modules/classroom/models';
import {ClassroomService} from '@modules/classroom/services';
import {CoursesService} from '@modules/courses/services/courses.service';
import {Courses, CoursesPlanned, Department, Employees, Roles, Teacher} from '@modules/employees/models';
import {EmployeesService} from '@modules/employees/services/employees.service';
import {Students} from '@modules/student/models';
import {EplannedCourseStatus} from '@modules/courses/models/course.model';
import {StudentService} from '@modules/student/services/students.service';

import {TeacherService} from '@modules/teachers/services/teacher.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'sb-courses-planner',
  templateUrl: './courses-planned-create.component.html',
  styleUrls: ['./courses-planned-create.component.scss']
})
export class CoursesPlannedCreateComponent implements OnInit {
  selectedCourse:Courses | undefined
  selectedPlanCourse?: any =[]
  public createPlanForm?: FormGroup;
  public editPlanForm?: FormGroup;
  id: any
  idCoursePlanned: any
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
  history: any[] = [];
  /*<----Getter of array--->*/
  private teacher$?: Observable<Teacher[]>;
  private employee$?: Observable<Employees[]>;
  private classrom$?: Observable<Room[]>;
  private student$?: Observable<Students[]>;
  private course$?: Observable<Courses[]>;
  frequency: any = [];
  dropdownSettingsFrequency: any = {};
  dropdownSettingsRoom: any = {};
  dropdownSettingsStudent: any = {};
  statusKeys = Object.keys;
  EplannedCourseStatus = EplannedCourseStatus
  /*<----Getter of array--->*/

  constructor(
      private coursesService:CoursesService,
      private teacherService:TeacherService,
      private studentService:StudentService,
      private classroomService:ClassroomService,
      private employeesService:EmployeesService,
      public activatedRoute:ActivatedRoute,
      public router:Router,private tokenStorageService:TokenStorageService,
      public fb: FormBuilder
  ) {
   this.editPlanForm = this.fb.group({
      courseLevel: new FormControl('',   Validators.required),
      idCourses :new FormControl('',   Validators.required),
      courseName: new FormControl('',   Validators.required),
      courseFrequency: new FormControl('',   Validators.required),
      endDate: new FormControl('',   Validators.required),
      startDate: new FormControl('',   Validators.required),
       plannedCourseStatus:new FormControl('',   Validators.required),
      courseType: new FormControl('',   Validators.required),
      courseUnit:new FormControl('',   Validators.required),
       courseMode: new FormControl('',   Validators.required),
      coursesTime:new FormControl('',   Validators.required),
       startTime:new FormControl('',   Validators.required),
       endTime:new FormControl('',   Validators.required),
       employee: new FormControl('',  new FormArray([])),
      room: new FormControl('',   Validators.required),
       students: new FormControl('',  new FormArray([])),
    });
    this.createPlanForm = this.fb.group({
        courseLevel: new FormControl('',   Validators.required),
        idCourses :new FormControl('',   Validators.required),
        courseName: new FormControl('',   Validators.required),
        courseFrequency: new FormControl('',   Validators.required),
        plannedCourseStatus:new FormControl('',   Validators.required),
        endDate: new FormControl('',   Validators.required),
        startDate: new FormControl('',   Validators.required),
        courseType: new FormControl('',   Validators.required),
        courseUnit:new FormControl('',   Validators.required),
        courseMode: new FormControl('',   Validators.required),
        coursesTime:new FormControl('',   Validators.required),
        startTime:new FormControl('',   Validators.required),
        endTime:new FormControl('',   Validators.required),
        employee: new FormControl('',  new FormArray([])),
        room: new FormControl('',   Validators.required),
        students: new FormControl('',  new FormArray([])),
    });
  }
  ngOnInit(): void {
    this.getSelectedCourses()
    this.employeesService.getAllEmployees()
    this.employee$ = this.employeesService.employees$;
   //
  this.teacher$ = this.teacherService.teacher$;
  this.studentService.getAllStudents()
  this.student$=this.studentService.student$;
  this.classrom$=this.classroomService.classroom$;
  this.course$=this.coursesService.course$

    this.frequency = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      this.dropdownSettingsFrequency = {
          singleSelection: true,
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
      }
      this.dropdownSettingsStudent = {
          singleSelection: false,
          idField: 'code',
          itemsShowLimit: 30,
          textField: 'firstName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
      }
      this.dropdownSettingsRoom = {
          singleSelection: true,
          idField: 'id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 30,
      };
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
          const user = this.tokenStorageService.getUser();
          this.roles = user.roles;
          this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
          this.showAdminComp = this.roles.includes('ROLE_ADMIN');
          this.email = user.email;}


  }
  get classroom(): FormArray {
    {return this.createPlanForm?.get('class') as FormArray;
    }
  }
  get changeFrequency() : FormArray{
    return this.createPlanForm?.get('frequency') as  FormArray;
  }

  get teacher() {
    return this.createPlanForm?.get('teacher')as FormArray;;
  }

  changeClassroom(e:any) {
  }
  changeTeacher(e:any) {
  }
      get type() {
        return this.createPlanForm?.get('courseType');
      }
    get courseLevel() {
            return this.createPlanForm?.get('courseLevel');
     }
  changeType(event: { value: any; target: { value: any; }; }) {
    this.type?.setValue(event.target?.value, {
      onlySelf: false
    })
  }
  getSelectedCourses(){
    this.id  = this.activatedRoute.snapshot.paramMap.get('id');
    this.idCoursePlanned=this.activatedRoute.snapshot.paramMap.get('idCourse')
    if (this.id){
      this.coursesService.getSelectedCourse(this.id).subscribe(
          ( course:any)=> {
            this.selectedCourse=course;
            this.patchCourseForm(course)
          }
      )
    }
    if (this.idCoursePlanned){
      this.coursesService.getSelectedCoursePlanned(this.idCoursePlanned).subscribe(
          ( course:any)=> {
            this.selectedCourse=course;
            this.patchCoursePlannedForm(course)
          }
      )
    }
  }
  patchCourseForm(selectedCourse: Courses | undefined) {
    this.createPlanForm!.setValue({
      courseLevel: selectedCourse?.courseLevel,
      courseName:selectedCourse?.courseName,
      coursePrice: selectedCourse?.coursePrice,
      courseUnit: selectedCourse?.courseUnit,
      coursesFrequency: null,
      startDate: null,
      endDate: null,
      coursesTime:  null,
      employee:null,
      class:null,
      students:null
    })
  }
 patchCoursePlannedForm(selectedCourse: CoursesPlanned | undefined) {
    this.editPlanForm!.setValue({
      idCourses: selectedCourse?.courses.idCourses,
      courseLevel: selectedCourse?.courses.courseLevel,
      courseName:selectedCourse?.courses.courseName,
      coursePrice: selectedCourse?.courses.coursePrice,
      courseUnit: selectedCourse?.courses.courseUnit,
      coursesFrequency: selectedCourse?.courseFrequency,
      startDate: selectedCourse?.startDate,
      endDate: selectedCourse?.endDate,
      coursesTime:  selectedCourse?.coursesTime,
      employee:selectedCourse?.employee.id,
      class:selectedCourse?.room.id
  })
}
  onSubmit(){
      console.log({
          "courses":{
              "courseName": this.selectedPlanCourse.courseName,
              "courseLevel": this.selectedPlanCourse.courseLevel,
              "courseUnit":this.selectedPlanCourse.courseUnit,
              "coursePrice": this.selectedPlanCourse.coursePrice,
              "courseStatus": this.selectedPlanCourse.courseStatus,
              "courseComment":this.selectedPlanCourse.courseComment,
              "courseDescription": this.selectedPlanCourse.courseDescription,
              "student": [],
              "institution": {
                  "id": this.selectedPlanCourse.institution.id,
                  "institutionName": this.selectedPlanCourse.institution.institutionName
              },
              "idCourses": this.selectedPlanCourse.idCourses
          },
          "startDate":  this.createPlanForm?.value?.startDate,
          "endDate":  this.createPlanForm?.value?.endDate,
          "startTime":  this.createPlanForm?.value?.startDate,
          "endTime":  this.createPlanForm?.value?.endDate,
          "coursesFrequency": "["+this.createPlanForm?.value?.courseFrequency+"]",
          "courseMode":  this.createPlanForm?.value?.courseMode,
          "courseType":  this.createPlanForm?.value?.courseType,
          "remark":  this.createPlanForm?.value?.remark,
          /*Employee*/
          "employee":this.createPlanForm?.value?.employee,
          "room":this.createPlanForm?.value?.room,
          "students":this.createPlanForm?.value?.students,
      })
     this.createPlanForm?.value?.room.forEach((r:any)=>{
         this.coursesService.createCoursePlanned(

             {
                 "courses":{
                     "courseName": this.selectedPlanCourse.courseName,
                     "courseLevel": this.selectedPlanCourse.courseLevel,
                     "courseUnit":this.selectedPlanCourse.courseUnit,
                     "coursePrice": this.selectedPlanCourse.coursePrice,
                     "courseStatus": this.selectedPlanCourse.courseStatus,
                     "courseComment":this.selectedPlanCourse.courseComment,
                     "courseDescription": this.selectedPlanCourse.courseDescription,
                     "student": [],
                     "institution": {
                         "id": this.selectedPlanCourse.institution.id,
                         "institutionName": this.selectedPlanCourse.institution.institutionName
                     },
                     "idCourses": this.selectedPlanCourse.idCourses
                 },
                 "startDate":  this.createPlanForm?.value?.startDate,
                 "endDate":  this.createPlanForm?.value?.endDate,
                 "startTime":  this.createPlanForm?.value?.startDate,
                 "endTime":  this.createPlanForm?.value?.endDate,
                 "coursesFrequency": "["+this.createPlanForm?.value?.courseFrequency+"]",
                 "courseMode":  this.createPlanForm?.value?.courseMode,
                 "courseType":  this.createPlanForm?.value?.courseType,
                 "remark":  this.createPlanForm?.value?.remark,
                 /*Employee*/
                 "employee":this.createPlanForm?.value?.employee,
                 "room":r,
                 "students":this.createPlanForm?.value?.students,
             }
         )
     })
  }

    selectCourseByName(courseLevel:any){
      console.log(courseLevel)
        this.coursesService.getCourseByLevel(courseLevel).subscribe(
            ( course:any)=> {
                console.log(course)
                this.selectedCourse=course;
            }
        )
    }

    changeCourseLevel(event: any) {
        console.log(event.target.value)
        this.selectCourseByName(event.target.value)
    }

    display(cl: Courses) {
        this.selectedPlanCourse=cl
        console.log(cl)
    }
}

