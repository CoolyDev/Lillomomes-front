import { Component, OnInit } from '@angular/core';
import {Employees} from "@modules/employees/models";
import {EmployeesService} from "@modules/employees/services/employees.service";
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "@modules/student/services/students.service";
import {Students} from "@modules/student/models";

@Component({
  selector: 'sb-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  selectedStudentDetails: Students | undefined
  studentId: string | null | undefined
  active = 1;
  constructor(
    private studentService:StudentService,
    public activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getSelectedEmployeeDetails()
  }
  getSelectedEmployeeDetails(){
    this.studentId  = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.studentId){
      this.studentService.getSelectedStudent(this.studentId).subscribe(
        ( student:any)=> {
          this.selectedStudentDetails=student;
        })
    }
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
