import {Component, Input, OnInit} from '@angular/core';
import {CoursesService} from '@modules/courses/services/courses.service';
import {CoursesPlanned, Teacher} from '@modules/employees/models';
import {TeacherService} from '@modules/teachers/services/teacher.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'sb-courses-planner-list',
  templateUrl: './courses-planner-list.component.html',
  styleUrls: ['./courses-planner-list.component.scss']
})
export class CoursesPlannedListComponent implements OnInit {
  private coursesPlanned$?: Observable<CoursesPlanned[]>;
  total$!: Observable<number>;
  @Input() pageSize = 4;
  page: number = 1;
  studentView: any;
  constructor(private coursesPlannedService:CoursesService) { }

  ngOnInit() {
    this.coursesPlannedService.getAllCourses()
    this.coursesPlannedService.pageSize = this.pageSize;
    this.coursesPlanned$ = this.coursesPlannedService.coursePlanned$;
  }
  viewStudent(coursesPlanned: CoursesPlanned) {
    this.studentView=!this.studentView
    console.log(coursesPlanned.students)
  }
}
