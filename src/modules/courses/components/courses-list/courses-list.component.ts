import {Component, Input, OnInit} from '@angular/core';
import {CoursesService} from '@modules/courses/services/courses.service';
import {EmployeesService} from "@modules/employees/services/employees.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Courses, CoursesPlanned, Employees} from '@modules/employees/models';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';


@Component({
  selector: 'sb-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  private course$?: Observable<Courses[]>;
  @Input() pageSize = 4;
  closeResult: string | undefined;
  files: File[] = [];
  total$!: Observable<number>;
  constructor(private modalService: NgbModal,public router:Router,private coursesService:CoursesService) { }

  ngOnInit() {
    this.coursesService.getAllCourses()
    this.coursesService.pageSize = this.pageSize;
    this.course$ = this.coursesService.course$;
    this.total$ = this.coursesService.total$;
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
      jsonData['data'].forEach((cours:any)=>{
        this.coursesService.createCourse(cours)
      })
    }
    reader.readAsBinaryString(file);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
