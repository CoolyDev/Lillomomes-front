import {DecimalPipe} from '@angular/common';
import {Injectable, PipeTransform} from '@angular/core';
import {SortDirection} from '@modules/tables/directives';
import {BehaviorSubject, Subject} from 'rxjs';
import {Teacher} from '@modules/employees/models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Router} from "@angular/router";

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

@Injectable({providedIn: 'root'})
export class TeacherService {
  private _search$ = new Subject<void>();
  private _teacher$ = new BehaviorSubject<Teacher[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };
  constructor(private http: HttpClient,private pipe: DecimalPipe,private router:Router) {
    this.getAllTeacher()
  }

  get teacher$() {
    return this._teacher$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get pageSize() {
    return this._state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }
  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  getAllTeacher() {
    return this.http.get(environment.Teacher_API.API_TEACHER, { responseType: 'json' }).subscribe(
      (emp:any)=>{
        this._teacher$.next(emp.content);
        this._total$.next(emp.content.length)
      }
    );
  }
  createTeacher(teacher: any) {
    return this.http.post(environment.Teacher_API.API_TEACHER, teacher, {responseType: 'json'})
        .subscribe(
            ()=> {
              this.getAllTeacher();
              this.router.navigateByUrl('/teacher')
            }
        )
  }

  updateTeacher(teacher: any, id: string) {
    return this.http.put(environment.Teacher_API.API_TEACHER + '/' + id, teacher, {responseType: 'json'})
      .subscribe(
        ()=> {
          this.getAllTeacher(),
            this.router.navigateByUrl('/teacher')
        }
      );
  }
  pacthClassroom(teacher: any, id: number | null) {
    return this.http.patch(environment.Teacher_API.API_TEACHER + '/' + id, teacher, {responseType: 'json'})
        .subscribe(
            ()=> {
              this.getAllTeacher(),
                  this.router.navigateByUrl('/teacher')
            }
        );
  }
  getSelectedTeacher(id: string | null) {
    return this.http.get(environment.Teacher_API.API_TEACHER +'/'+ id, {responseType: 'json'})
  }

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    this.saveExcelFile(excelBuffer, fileName);
  }
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}
