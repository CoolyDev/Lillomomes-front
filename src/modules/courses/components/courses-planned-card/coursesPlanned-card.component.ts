import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '@modules/courses/services/courses.service';
import {Courses, CoursesPlanned, Employees} from '@modules/employees/models';
import {Observable} from "rxjs";
import {EmployeesService} from "@modules/employees/services/employees.service";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'sb-coursesPlanned-card',
  templateUrl: './coursesPlanned-card.component.html',
  styleUrls: ['./coursesPlanned-card.component.scss']
})

export class CoursesPlannedCardComponent implements OnInit {
  @Input() coursesPlanned: CoursesPlanned | undefined;
  ellipsis=faEllipsisV;
  studentView: any;
  constructor(private activatedRoute:ActivatedRoute,
              private modalService:NgbModal,
              private  coursesService:CoursesService,
              public fb: FormBuilder,
              private router:Router) {
  }
  ngOnInit(): void {
  }
  viewStudent(coursesPlanned: CoursesPlanned) {
    this.studentView=!this.studentView
  }

  viewCoursesPlanned(coursesPlanned: CoursesPlanned) {
    this.router.navigateByUrl('courses/course-planned-details/'+coursesPlanned.idPlanCourse)
  }

  editCoursePlanned(coursesPlanned: CoursesPlanned) {

  }

  deleteCoursePlannedModal(coursesPlanned: CoursesPlanned, deleteModal: any) {

  }
  archivePlannedModal(targetModal: any, coursesPlanned: CoursesPlanned) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }

  archivePlannedCourse(coursePlanned: CoursesPlanned) {
    this.coursesService.updateCoursePlanned(coursePlanned)
    this.modalService.dismissAll();
  }
}
