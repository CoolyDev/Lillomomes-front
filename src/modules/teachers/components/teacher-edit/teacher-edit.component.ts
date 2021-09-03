import {Component, OnInit} from '@angular/core';
import {EmployeesService} from '@modules/employees/services/employees.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Department, Employees, Roles, History, Teacher} from '@modules/employees/models';
import {TeacherService} from '@modules/teachers/services/teacher.service';
import {Observable, Subscription} from 'rxjs';
import {TokenStorageService} from '@modules/auth/services/tokenstorageservice.service';

@Component({
    selector: 'sb-edit-teacher',
    templateUrl: './teacher-edit.component.html',
    styleUrls: ['./teacher-edit.component.scss']
})
export class TeacherEditComponent implements OnInit {
    selectedTeacher: Teacher | undefined
    public editTeacherForm?: FormGroup;
    public createTeacherForm?: FormGroup;
    id: any
    message: string | undefined;
    isLoggedIn = false;
    showSuperAdminComp = false;
    showAdminComp = false;
    private roles: string[] = [];
    email?: string;
    keys = Object.keys;
    eRole = Roles;
    eDepartments = Department;
    public isCollapsed = true;
    /*<----Getter of array--->*/
    get gender() {
        if (this.id) {
            return this.editTeacherForm?.get('gender');
        } else {
            return this.createTeacherForm?.get('gender');
        }
    }
    /*<----Getter of array--->*/
    constructor(
        private teacherService: TeacherService,
        public activatedRoute: ActivatedRoute,
        public router: Router, private tokenStorageService: TokenStorageService,
        public fb: FormBuilder
    ) {
        this.editTeacherForm = this.fb.group({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            gender: new FormControl('M'),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            privatePhone: new FormControl('', Validators.required),
        });
        this.createTeacherForm = this.fb.group({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            gender: new FormControl('M'),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            privatePhone: new FormControl('', Validators.required),
        });

    }
    ngOnInit(): void {
        this.getSelectedTeacher()
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
            this.showAdminComp = this.roles.includes('ROLE_ADMIN');
            this.email = user.email;
        }
    }
    get Sex() {
        return this.createTeacherForm?.get('gender');
    }
    getSelectedTeacher() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id) {
            this.teacherService.getSelectedTeacher(this.id).subscribe(
                (emp: any) => {
                    this.selectedTeacher = emp;
                    if (this.id) {
                        this.patchTeacherForm(emp)
                    }
                }
            )
        }
    }
    patchTeacherForm(selectedTeacher: Teacher | undefined) {
        this.editTeacherForm!.setValue({
            firstName: selectedTeacher?.firstName,
            lastName: selectedTeacher?.lastName,
            gender: selectedTeacher?.gender,
            email: selectedTeacher?.email,
            privatePhone: selectedTeacher?.privatePhone,
        })
    }

    changeGender(event: { value: any; target: { value: any; }; }) {
        console.log(event.value)
        if (this.id) {
            this.gender?.setValue(event.target?.value, {
                onlySelf: true
            })
        } else {
            this.gender?.setValue(event.target?.value, {
                onlySelf: true
            })
        }
    }
    onSubmit() {
        if (this.id) {
            if (this.editTeacherForm?.valid) {
                this.teacherService.updateTeacher(this.editTeacherForm?.value, this.id)
            }
        } else {
            if (this.createTeacherForm?.valid) {
                this.teacherService.createTeacher(this.createTeacherForm?.value)
            }
        }
    }
}
