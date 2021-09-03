import {DecimalPipe} from '@angular/common';
import {Injectable, PipeTransform} from '@angular/core';

import {SortDirection} from '@modules/tables/directives';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {Employees, Institution, Skill} from '@modules/employees/models';
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
    //employee.status.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({providedIn: 'root'})
export class EmployeesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<Employees[]>([]);
  private _skill$ = new BehaviorSubject<Skill[]>([]);
  private _institution$ = new BehaviorSubject<Institution[]>([]);
  private _archiveEmployees$ = new BehaviorSubject<Employees[]>([]);
  private _selectedEmployees$ = new BehaviorSubject<Employees[]>([]);
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
    this.getAllEmployees()
  }

  get employees$() {
    return this._employees$.asObservable();
  }
  get skill$() {
    return this._skill$.asObservable();
  }
  get institution$() {
    return this._institution$.asObservable();
  }
  get selectedEmp$() {
    return this._selectedEmployees$.asObservable();
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
  }

  getAllEmployees() {
    return this.http.get(environment.USERS_API.API_EMPLOYEES+'employees', { responseType: 'json' }).subscribe(
      (emp:any)=>{
        this._employees$.next(emp.content);
        this._total$.next(emp.content.length)
        this._search$
          .pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(120),
            switchMap(() => this._search(emp.content)),
            delay(120),
            tap(() => this._loading$.next(false))
          )
          .subscribe(result => {
            this._employees$.next(result.employees);
            this._total$.next(result.total);
          });

        this._search$.next();
      }
    );
  }

  getActivEmployees(status: Boolean) {
    return this.http.get(environment.USERS_API.API_EMPLOYEES + 'emp/' + status, { responseType: 'json' }).subscribe(
        (emp:any)=>{
          this._employees$.next(emp);
          this._total$.next(emp.length)
          /*this._search$
              .pipe(
                  tap(() => this._loading$.next(true)),
                  debounceTime(120),
                  switchMap(() => this._search(emp)),
                  delay(120),
                  tap(() => this._loading$.next(false))
              )
              .subscribe(result => {
                this._employees$.next(result.employees);
                this._total$.next(result.total);
              });

          this._search$.next();*/
        }
    );
  }

  getSkills() {
    return this.http.get(environment.USERS_API.API_SKILLS, { responseType: 'json' }).subscribe(
        (emp:any)=>{
          console.log(emp.content)
          this._skill$.next(emp.content);
          /*this._search$
              .pipe(
                  tap(() => this._loading$.next(true)),
                  debounceTime(120),
                  switchMap(() => this._search(emp)),
                  delay(120),
                  tap(() => this._loading$.next(false))
              )
              .subscribe(result => {
                this._employees$.next(result.employees);
                this._total$.next(result.total);
              });

          this._search$.next();*/
        }
    );
  }

  getInstitution() {
    return this.http.get(environment.USERS_API.API_INST, { responseType: 'json' }).subscribe(
        (emp:any)=>{
          console.log(emp.content)
          this._institution$.next(emp.content);
          /*this._search$
              .pipe(
                  tap(() => this._loading$.next(true)),
                  debounceTime(120),
                  switchMap(() => this._search(emp)),
                  delay(120),
                  tap(() => this._loading$.next(false))
              )
              .subscribe(result => {
                this._employees$.next(result.employees);
                this._total$.next(result.total);
              });

          this._search$.next();*/
        }
    );
  }

  updateEmployee(employee: any, id: string | undefined) {
    return this.http.put(environment.USERS_API.API_EMPLOYEES +'employees'+ '/' + id, employee, {responseType: 'json'})
      .subscribe(
        ()=> {
          this.getAllEmployees(),
            this.router.navigateByUrl('/employees')
        }
      );
  }

  pacthEmployee(employee: any, id: number | null) {
    return this.http.patch(environment.USERS_API.API_EMPLOYEES + 'employees/' + id, employee, {responseType: 'json'})
      .subscribe(
        ()=> {
          this.getAllEmployees(),
            this.router.navigateByUrl('/employees')
        }
      );
  }
  //<--A revoir--
  createEmployee(employee: any) {
    return this.http.post(environment.USERS_API.API_EMPLOYEES +'auth/dispachRole', employee, {responseType: 'json'})
  }
  createHistory(history: any,id:any) {
    return this.http.post(environment.USERS_API.API_EMPLOYEES +'employee'+'/'+id+'/historique', history, {responseType: 'json'})
  }
  updateHistory(history: any,id:any) {
    return this.http.patch('http://localhost:8400/api/' +'employee'+'/'+id+'/historique', history, {responseType: 'json'})
  }


  getSelectedEmployees(id: string | null) {
    return this.http.get(environment.USERS_API.API_EMPLOYEES + 'employees/' + id, {responseType: 'json'})
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
