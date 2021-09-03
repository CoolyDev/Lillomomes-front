import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '@modules/courses/services/courses.service';
import {Courses, Employees} from '@modules/employees/models';

@Component({
  selector: 'sb-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent implements OnInit {
  selectedCourse: Courses | undefined
  private courseId: any;
  constructor(private activatedRoute:ActivatedRoute,private courseService:CoursesService) { }

  ngOnInit(): void {
    this.getSelectedCourseDetails()
  }

  getSelectedCourseDetails(){
    this.courseId  = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.courseId){
      this.courseService.getSelectedCourse(this.courseId) .subscribe(
          ( course:any)=> {
            this.selectedCourse=course;
          }
      )
    }
  }
}
