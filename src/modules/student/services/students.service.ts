import { HttpClient } from '@angular/common/http';
import {Injectable, PipeTransform} from '@angular/core';
import { environment } from 'environments/environment';
import {SortDirection} from "@modules/tables/directives";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";
import {Students} from "@modules/student/models";
import {DecimalPipe} from "@angular/common";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { Router } from '@angular/router';

interface SearchResult {
  students: Students[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1: number | string, v2: number | string) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(students: any[], column: string, direction: string): Students[] {
  if (direction === '') {
    return students;
  } else {
    return [...students].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(students: Students, term: string, pipe: PipeTransform) {
  return (
    students.lastName.toLowerCase().includes(term.toLowerCase()) ||
    students.firstName.toLowerCase().includes(term.toLowerCase()) ||
    students.email.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _students$ = new BehaviorSubject<Students[]>([]);
  private _studentsExport$ = new BehaviorSubject<Students[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  private _state: State = {
    page: 1,
    pageSize: 20,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }
  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  constructor(private http: HttpClient,private pipe: DecimalPipe,private router:Router) {
  this.getAllStudents()
  }
  getAllStudents(){
    return this.http.get(environment.USERS_API.API_STUDENTS, { responseType: 'json' }).subscribe(
      (stud:any)=>{
        console.log(stud.content)
        this._students$.next(stud.content);
        this._studentsExport$.next(stud.content)
        this._total$.next(stud.content.length)
        this._search$
          .pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(120),
            switchMap(() => this._search(stud.content)),
            delay(120),
            tap(() => this._loading$.next(false))
          )
          .subscribe(result => {
           // this._studentsExport$.next(stud)
            this._students$.next(result.students);
            this._total$.next(result.total);
          });

        this._search$.next();
      }
    );
  }
  getSelectedStudent(code: string | null){
    return this.http.get(environment.USERS_API.API_STUDENTS +'/'+code, { responseType: 'json' });
  }
  updateStudent(student:any,id: string | undefined){
    return this.http.put(environment.USERS_API.API_STUDENTS +'/'+id,student, { responseType: 'json' }).subscribe(
      ()=> {this.getAllStudents(),this.router.navigateByUrl('/students')}
    );
  }
  createStudent(student:any){
    return this.http.post(environment.USERS_API.API_STUDENTS ,student, { responseType: 'json' }).subscribe(
      ()=> {this.getAllStudents(),this.router.navigateByUrl('/students')}
    );
  }
  deleteStudent(id: string | undefined){
    return this.http.delete(environment.USERS_API.API_STUDENTS +'/'+id, { responseType: 'json' }).subscribe(
      ()=> this.getAllStudents()
    );
  }
  get student$() {
    return this._students$.asObservable();
  }
  get studentExport$() {
    return this._studentsExport$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  set page(page: number) {
    this._set({ page });
  }
  get pageSize() {
    return this._state.pageSize;
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  private _search(data: any[]): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let students = sort(data, sortColumn, sortDirection);

    // 2. filter
    students = students.filter(student => matches(student, searchTerm, this.pipe));
    const total = students.length;

    // 3. paginate
    students = students.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ students, total });
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
