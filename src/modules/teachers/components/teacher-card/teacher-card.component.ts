import {Component, Input, OnInit} from '@angular/core';
import {ClassroomService} from '@modules/classroom/services';
import {Employees, Teacher} from '@modules/employees/models';
import {TeacherService} from '@modules/teachers/services/teacher.service';
import {Observable} from "rxjs";
import {EmployeesService} from "@modules/employees/services/employees.service";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'sb-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss']
})

export class TeacherCardComponent implements OnInit {
  @Input() teacher: Teacher | undefined;
  ellipsis=faEllipsisV;
  constructor(private router:Router,private teacherService:TeacherService,) { }
  ngOnInit(): void {

  }

  viewTeacher(teacher: Teacher) {
    this.router.navigateByUrl('teacher/profil-teacher/' + teacher.idTeacher);
  }
  archiveTeacher(teacher: Teacher) {
    teacher.archived=!teacher.archived
    this.teacherService.pacthClassroom(teacher,teacher.idTeacher)
  }
}
