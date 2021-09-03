import {Component, Input, OnInit} from '@angular/core';
import {Room} from '@modules/classroom/models';
import {CoursesService} from '@modules/courses/services/courses.service';
import {Courses, CoursesPlanned, Employees, Teacher} from '@modules/employees/models';
import {Observable} from "rxjs";
import {EmployeesService} from "@modules/employees/services/employees.service";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'sb-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.scss']
})

export class CoursesCardComponent implements OnInit {
  @Input() course: Courses | undefined;
  private idCourse?: number | null;
  ellipsis=faEllipsisV;
  constructor(private router:Router,
              private courseService:CoursesService,
              private modalService:NgbModal) { }
  ngOnInit(): void {

  }
  planCourse(course: any) {
    this.router.navigateByUrl('courses/course-planner/' + course.idCourses);
  }
  editCourse(course: any) {
    this.router.navigateByUrl('courses/edit-course/' + course.idCourses);
  }

  deleteCourseModal( course: Courses,deleteModal: any) {
    this.idCourse=course.idCourses
    this.modalService.open(deleteModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  deleteCourse() {
    this.modalService.dismissAll();
    this.courseService.deleteCourse(this.idCourse)
  }
  disableCourse(course: Courses) {
    course.courseStatus=!course.courseStatus
    this.courseService.patchCourse(course,course.idCourses)
  }

  viewCourse(course: any) {
    this.router.navigateByUrl('courses/course-details/' + course.idCourses);
  }
}
