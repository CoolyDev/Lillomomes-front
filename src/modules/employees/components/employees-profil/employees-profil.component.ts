import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '@modules/auth/services/tokenstorageservice.service';
import { Department, Employees, Roles } from '@modules/employees/models';
import { EmployeesService } from '@modules/employees/services/employees.service';
@Component({
  selector: 'sb-employees-profil',
  templateUrl: './employees-profil.component.html',
  styleUrls: ['./employees-profil.component.scss']
})
export class EmployeesProfilComponent implements OnInit {
  isLoggedIn = false;
  isEditProfil = false;
  username?: string;
  public editEmployForm: FormGroup;
  private roles: string[] = [];
  email?: string;
  keys = Object.keys;
  eRole = Roles;
  eDepartments = Department;
  selectedEmploy: any;
  private id: any;
  get role() { return this.editEmployForm.get("roles") as FormArray;}
  get department() {
    {return this.editEmployForm.get('department');}
  }
  get status() {
      {return this.editEmployForm.get('status');}
  }
  get sex() {
    {return this.editEmployForm.get('gender');
    }
  }
  constructor(
              private tokenStorageService:TokenStorageService, 
              private employeesService:EmployeesService,
              public fb: FormBuilder
              ) { 

    this.editEmployForm = this.fb.group({
      id: new FormControl('',   Validators.required),
      firstName: new FormControl('',   Validators.required),
      lastName: new FormControl('',   Validators.required),
      gender: new FormControl('M',   Validators.required),
      jobRole: new FormControl('',   Validators.required),
      department: new FormControl('',   Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      businessPhone: new FormControl('',   Validators.required),
      privatePhone: new FormControl('',   Validators.required),
      workLocation: new FormControl('',   Validators.required),
      status: new FormControl('',   Validators.required),
      roles: new FormControl('',  new FormArray([])),
      password: new FormControl('',   Validators.required),
      Cpassword: new FormControl('',   Validators.required),
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.selectedEmploy=user
      this.id=user.id
      if (user.id){
        this.employeesService.getSelectedEmployees(user.id).subscribe(
          ( emp:any)=> {
            this.selectedEmploy=emp;
            if (user.id){
              if (emp) {
                emp.roles.map((role: any) => {
                  this.role.patchValue(role['name'])
                });
              }
              this.patchEmployeeForm(emp)
              console.log(this.role.value)
            }
          }
          )
      }


    }
  }
  editProfil(){
    this.isEditProfil=!this.isEditProfil
  }

  patchEmployeeForm(selectedEmploy: Employees | undefined) {
    this.editEmployForm!.setValue({
      id:selectedEmploy?.id,
      firstName: selectedEmploy?.firstName?selectedEmploy?.firstName:null,
      lastName: selectedEmploy?.lastName?selectedEmploy?.lastName:null,
      gender:selectedEmploy?.gender?selectedEmploy?.gender:null,
      jobRole: selectedEmploy?.jobRole?selectedEmploy?.jobRole:null,
      department: selectedEmploy?.department?selectedEmploy?.department:null,
      email: selectedEmploy?.email?selectedEmploy?.email:null,
      businessPhone:selectedEmploy?.businessPhone?selectedEmploy?.businessPhone:null,
      privatePhone:selectedEmploy?.privatePhone?selectedEmploy?.privatePhone:null,
      workLocation:selectedEmploy?.workLocation?selectedEmploy?.workLocation:null,
      status:selectedEmploy?.status?selectedEmploy?.status:null,
      roles:this.role.value?this.role.value:null,
      password:selectedEmploy?.password?selectedEmploy?.password:null,
      //Cpassword:selectedEmploy?.Cpassword?selectedEmploy?.Cpassword:null
    })
    console.log(this.editEmployForm.value)
  }
  onSubmit(){
    console.log('ok')
    this.employeesService.updateEmployee(this.editEmployForm.value,this.id)
  }
  dismiss(){
    this.isEditProfil=false
  }

  changeDepartment($event: Event) {
    
  }

  changeStatus($event: Event) {
    
  }

  changeGender($event: Event) {
    
  }
}
