import {DecimalPipe} from '@angular/common';
import {Injectable, PipeTransform} from '@angular/core';
import {Room} from '@modules/classroom/models';

import {SortDirection} from '@modules/tables/directives';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {Employees, Teacher} from '@modules/employees/models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import * as FileSaver from 'file-saver';
  import * as XLSX from 'xlsx';
import {Router} from "@angular/router";
interface SearchResult {
  employees: Employees[];
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

function sort(employees: any[], column: string, direction: string): Employees[] {
  if (direction === '') {
    return employees;
  } else {
    return [...employees].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(employee: Employees, term: string, pipe: PipeTransform) {
  return (
    employee.firstName.toLowerCase().includes(term.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(term.toLowerCase()) ||
    employee.email.toLowerCase().includes(term.toLowerCase()) ||
    employee.gender.toLowerCase().includes(term.toLowerCase()) ||
    employee.businessPhone.toLowerCase().includes(term.toLowerCase()) ||
    employee.privatePhone.toLowerCase().includes(term.toLowerCase()) ||
    employee.department.toLowerCase().includes(term.toLowerCase()) ||
    employee.jobRole.toLowerCase().includes(term.toLowerCase()) ||
    employee.workLocation.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({providedIn: 'root'})
export class ClassroomService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _classroom$ = new BehaviorSubject<Room[]>([]);
  private _selectedClassroom$ = new BehaviorSubject<Room[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _id$ = new BehaviorSubject<number>(0);
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
    this.getAllClassroom()
  }

  get classroom$() {
    return this._classroom$.asObservable();
  }
  get selectedClass$() {
    return this._selectedClassroom$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get id$() {
    return this._id$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  set page(page: number) {
    this._set({page});
  }

  get pageSize() {
    return this._state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: string) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
/*
  private _search(employee: any[]): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let employees = sort(employee, sortColumn, sortDirection);

    // 2. filter
    employees = employees.filter(employee => matches(employee, searchTerm, this.pipe));
    const total = employees.length;

    // 3. paginate
    employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({employees, total});
  }*/

  getAllClassroom() {
    return this.http.get(environment.Classroom_API.API_CLASSROOM, { responseType: 'json' }).subscribe(
      (emp:any)=>{
        console.log(emp.content)
        this._classroom$.next(emp.content);
        this._total$.next(emp.content.length)
      }
    );
  }
  updateClassroom(classroom: any, id: number) {
    return this.http.put(environment.Classroom_API.API_CLASSROOM + '/' + id, classroom, {responseType: 'json'})
      .subscribe(
        ()=> {
          this.getAllClassroom(),
            this.router.navigateByUrl('/rooms')
        }
      );
  }
  pacthClassroom(classroom: any, id: number | null) {
    return this.http.patch(environment.Classroom_API.API_CLASSROOM + '/' + id, classroom, {responseType: 'json'})
        .subscribe(
            ()=> {
              this.getAllClassroom(),
                  this.router.navigateByUrl('/rooms')
            }
        );
  }
  createClassroom(classroom: any) {
    return this.http.post(environment.Classroom_API.API_CLASSROOM, classroom, {responseType: 'json'}).subscribe(
        ()=>{
          this.getAllClassroom();
        }
    )
  }

  deleteClassroom(id: number | undefined) {
    return this.http.delete(environment.Classroom_API.API_CLASSROOM + '/' + id, {responseType: 'json'})
      .subscribe(
        ()=>this.getAllClassroom()
      );
  }

  getSelectedClassroom(id: string | null) {
    return this.http.get(environment.Classroom_API.API_CLASSROOM + '/' + id, {responseType: 'json'})
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
