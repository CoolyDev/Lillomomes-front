import {DecimalPipe} from '@angular/common';
import {Injectable, PipeTransform} from '@angular/core';

import {SortDirection} from '@modules/tables/directives';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {Courses, CoursesPlanned, Employees} from '@modules/employees/models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Router} from "@angular/router";
import { map } from 'rxjs/operators';
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
export class CoursesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _course$ = new BehaviorSubject<Courses[]>([]);
  private _coursePlanned$ = new BehaviorSubject<CoursesPlanned[]>([]);
  private _selectedCourse$ = new BehaviorSubject<Courses[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _id$ = new BehaviorSubject<number>(0);
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  private _state: State = {
    page: 1,
    pageSize: 20,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private http: HttpClient,private pipe: DecimalPipe,private router:Router) {
    this.getAllCourses()
      /*A REVOIR*/
    this.getAllCoursesPlanned()
  }

  get course$() {
    return this._course$.asObservable();
  }
  get coursePlanned$() {
    return this._coursePlanned$.asObservable();
  }
  get selectedCourse$() {
    return this._selectedCourse$.asObservable();
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
/*CoursesPlanned*/
  getAllCoursesPlanned() {
    return this.http.get(environment.COURSES_API.API_COURSES+'/coursesPlanned', { responseType: 'json' }).subscribe(
        (course:any)=>{
          this._coursePlanned$.next(course.content);
          /*  this._total$.next(course.content.length)
            this._search$
                .pipe(
                    tap(() => this._loading$.next(true)),
                    debounceTime(120),
                    //switchMap(() => this._search(stud.content)),
                    delay(120),
                    tap(() => this._loading$.next(false))
                )
                .subscribe(result => {
                    // this._studentsExport$.next(stud)
                    this._coursePlanned$.next(result.students);
                    this._total$.next(result.total);
                });

            this._search$.next();*/
        }
    );
  }

  getSelectedCoursePlanned(id: string | null) {
    return this.http.get(environment.COURSES_API.API_COURSES + '/coursesPlanned/' + id, {responseType: 'json'})
  }
  createCoursePlanned(course: any) {
    return this.http.post(environment.COURSES_API.API_COURSES +'/coursesPlanned', course, {responseType: 'json'})
        .subscribe(
            (coursePlanned:any)=>{
              this.getAllCoursesPlanned();

              this.router.navigateByUrl('/courses/course-planned-list/')
            },
        )

  }
  updateCoursePlanned(course: any) {
    return this.http.patch(environment.COURSES_API.API_COURSES +'/coursesPlanned/'+ course.idPlanCourse, course, {responseType: 'json'})
        .subscribe(
            (coursePlan:any)=> {
                this._coursePlanned$.next(coursePlan);
                this.router.navigateByUrl('/courses/course-planned-details/'+course.idPlanCourse)
            }
        );
  }
    deleteCoursePlanned(id: number | null | undefined) {
        return this.http.delete(environment.COURSES_API.API_COURSES +'/coursesPlanned' + '/' + id, {responseType: 'json'})
            .subscribe(
                ()=>{
                    this.getAllCoursesPlanned();
                    this.router.navigateByUrl('/courses/course-planned-list')
                }
            );
    }
    /*Courses*/
  getAllCourses() {
    return this.http.get(environment.COURSES_API.API_COURSES+'/courses', { responseType: 'json' }).subscribe(
        (course:any)=>{
          this._course$.next(course.content);
        }
    );
  }
  patchCourse(course: any, id: number | null) {
    return this.http.patch(environment.COURSES_API.API_COURSES +'/courses'+ '/' + id, course, {responseType: 'json'})
        .subscribe(
            ()=> {
              this.getAllCourses(),
                  this.router.navigateByUrl('/courses')
            }
        );
  }
    updateCourse(course: any, id: number | null) {
        return this.http.put(environment.COURSES_API.API_COURSES +'/courses'+ '/' + id, course, {responseType: 'json'})
            .subscribe(
                ()=> {
                    this.getAllCourses(),
                        this.router.navigateByUrl('/courses')
                }
            );
    }
  createCourse(course: any) {
    return this.http.post(environment.COURSES_API.API_COURSES +'/courses', course, {responseType: 'json'})
        .subscribe(
            ()=>{
              this.getAllCourses();
              this.router.navigateByUrl('/courses')
            }
        )
  }

    deleteCourse(id: number | null | undefined) {
        return this.http.delete(environment.COURSES_API.API_COURSES +'/courses' + '/' + id, {responseType: 'json'})
            .subscribe(
                ()=>{
                    this.getAllCourses();
                    this.router.navigateByUrl('/courses')
                }
            );
    }

  getSelectedCourse(id: string | null) {
    return this.http.get(environment.COURSES_API.API_COURSES + '/courses/' + id, {responseType: 'json'})
  }
    getCourseByLevel(courseLevel: string | null) {
        return this.http.get(environment.COURSES_API.API_COURSES + '/coursesLevel/' + courseLevel, {responseType: 'json'})
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
