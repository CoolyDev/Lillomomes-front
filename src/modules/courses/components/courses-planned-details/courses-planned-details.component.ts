import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Room} from '@modules/classroom/models';
import {CoursesService} from '@modules/courses/services/courses.service';
import {Courses, CoursesPlanned} from '@modules/employees/models';
import {Students} from '@modules/student/models';
import {StudentService} from '@modules/student/services/students.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

@Component({
  selector: 'sb-courses-planned-details',
  templateUrl: './courses-planned-details.component.html',
  styleUrls: ['./courses-planned-details.component.scss']
})
export class CoursesPlannedDetailsComponent implements OnInit {

  selectedPlannedCourse: CoursesPlanned | undefined
  private plannedCourseId: any;
  dropdownSettingsStudent: any = {};
  public createStudentForm?: FormGroup;
  private student$?: Observable<Students[]>;
  constructor(private activatedRoute:ActivatedRoute,private studentService:StudentService,
              private modalService: NgbModal,private router:Router,
              private courseService:CoursesService,private fb:FormBuilder) {
    this.createStudentForm = this.fb.group({
      students:new FormControl('',   Validators.required),
    });
  }

  ngOnInit(): void {
    this.getSelectedPlannedCourseDetails()
    this.studentService.getAllStudents()
    this.student$=this.studentService.student$;
    this.dropdownSettingsStudent = {
      singleSelection: false,
      idField: 'code',
      itemsShowLimit: 30,
      textField: 'firstName',
      selectAllText: 'Select All',
      allowSearchFilter: true,
      unSelectAllText: 'UnSelect All',
    }
  }

  getSelectedPlannedCourseDetails(){
    this.plannedCourseId  = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.plannedCourseId){
      this.courseService.getSelectedCoursePlanned(this.plannedCourseId) .subscribe(
          ( course:any)=> {
            console.log(course)
            this.selectedPlannedCourse=course;
          }
      )
    }
  }
  deleteStudent() {
  }

  viewStudent(student: Students) {
    this.router.navigateByUrl('students/student-details/' + student.code);
  }

  editStudent(student: Students) {
    this.router.navigateByUrl('students/student-edit/' + student.code);
  }

  addStudent(coursesPlanned: CoursesPlanned, content: any) {
    //this.idClassroom=student.id
    this.modalService.open(content, {   centered: true,size: 'lg' });
  }

  onSubmit() {
      this.courseService.updateCoursePlanned({
        "idPlanCourse":this.selectedPlannedCourse?.idPlanCourse,
        "courses":{
          "courseName": this.selectedPlannedCourse?.courses?.courseName,
          "courseLevel": this.selectedPlannedCourse?.courses?.courseLevel,
          "courseUnit":this.selectedPlannedCourse?.courses?.courseUnit,
          "coursePrice": this.selectedPlannedCourse?.courses?.coursePrice,
          "courseStatus": this.selectedPlannedCourse?.courses?.courseStatus,
          "courseComment":this.selectedPlannedCourse?.courses?.courseComment,
          "courseDescription": this.selectedPlannedCourse?.courses.courseDescription,
          "student": [],
          "institution": this.selectedPlannedCourse?.courses.institution,
          "idCourses": this.selectedPlannedCourse?.courses?.idCourses
        },
        "startDate":  this.selectedPlannedCourse?.startDate,
        "endDate":   this.selectedPlannedCourse?.endDate,
        "startTime":  this.selectedPlannedCourse?.startDate,
        "endTime":   this.selectedPlannedCourse?.endDate,
        "coursesFrequency": "["+ this.selectedPlannedCourse?.courseFrequency+"]",
        "courseMode":   this.selectedPlannedCourse?.courseMode,
        "courseType":  this.selectedPlannedCourse?.courseType,
        "remark":   this.selectedPlannedCourse?.remark,
        /*Employee*/
        "employee": this.selectedPlannedCourse?.employee,
        "room": this.selectedPlannedCourse?.room,
        "students": this.createStudentForm?.value?.students,
      })
    this.modalService.dismissAll()
    this.courseService.getSelectedCoursePlanned(this.plannedCourseId)
  }
}
