import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "@modules/employees/services/employees.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department, Employees, Roles, History, Skill, Institution, EmergencyContactNature} from '@modules/employees/models';
import {ToastService} from '@modules/employees/toast/toast-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subscription} from "rxjs";
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'sb-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  selectedEmploy: Employees | undefined
  public editEmployForm: FormGroup;
  public createEmployForm: FormGroup;
  keys = Object.keys;
  Econtactnature = EmergencyContactNature
  id: any
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  showUser = false;
  private roles: string[] = [];
  email?: string;
  eRole = Roles;
  eDepartments = Department;
  public isCollapsed = true;
  private _id$: Subscription | undefined;
  history: any[] = [];
  tempoContact:any[]=[]
  employee$!: Observable<Employees[]>;

  skill$!: Observable<Skill[]>;
  institution$!: Observable<Institution[]>;
  dropdownSettingsInstitution: any = {};
  frequence: any = [];
  dropdownSettingsSkills: any = {};
  /*<----Getter of array--->*/
  dropdownSettingsNature: any = {};
  econtactnature = EmergencyContactNature;
  get Econtact() : FormArray {
    if (this.id){
      return this.editEmployForm.controls.emergencyContacts as FormArray
    }
    else {
      return this.createEmployForm.controls.emergencyContacts as FormArray
    }
  }
  get role() { return this.editEmployForm.get("roles") as FormArray}
  get department() {
    if(this.id)
    {return this.editEmployForm.get('department');}
    else{return this.createEmployForm.get('department');}
  }
  get jobType() {
    if (this.id){return this.editEmployForm.get('jobType');}
    else{return this.createEmployForm.get('jobType');}
  }
  get status() {
    if (this.id){return this.editEmployForm.get('status');}
    else{return this.createEmployForm.get('status');}
  }
  get sex() {
    if (this.id){return this.editEmployForm.get('gender');
    }
    else {return this.createEmployForm.get('gender');
    }
  }

  /*<----Getter of array--->*/
  constructor(
    private employeesService:EmployeesService,
    public activatedRoute:ActivatedRoute,
    public modalService:NgbModal,
    public toastService:ToastService,
    public router:Router,private tokenStorageService:TokenStorageService,
    public fb: FormBuilder
  ) {
    this.editEmployForm = this.fb.group({
      id:new FormControl('',   Validators.required),
      firstName: new FormControl('',   Validators.required),
      lastName: new FormControl('',   Validators.required),
      gender: new FormControl('M'),
      birthday: new FormControl('',   Validators.required),
      businessPhone: new FormControl('',   Validators.required),
      privatePhone: new FormControl('',   Validators.required),
      email: new FormControl('',   [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      nationality: new FormControl('',   Validators.required),
      status: new FormControl('',   Validators.required),
      linkedinLink: new FormControl('',   Validators.required),
      xingLink: new FormControl('',   Validators.required),
      facebookLink: new FormControl('',   Validators.required),
      youtubeLink: new FormControl('',   Validators.required),

      /*Address*/

      address: new FormControl('',   Validators.required),
      city: new FormControl('',   Validators.required),
      country: new FormControl('',   Validators.required),

      /*Functional Data*/

      institution: new FormControl('',   new FormArray([])),
      skills: new FormControl('',   new FormArray([])),
      department: new FormControl('',   Validators.required),
      jobRole: new FormControl('',   Validators.required),
      jobType: new FormControl('',   Validators.required),
      workLocation: new FormControl('',   Validators.required),

     // roles: new FormControl('',   new FormArray([])),
      emergencyContacts: new FormArray([]),
     // historique: new FormControl('',   new FormArray([])),
    });
    this.createEmployForm = this.fb.group({

      /*Personal Data*/

      firstName: new FormControl('',   Validators.required),
      lastName: new FormControl('',   Validators.required),
      gender: new FormControl('M'),
      birthday: new FormControl('',   Validators.required),
      businessPhone: new FormControl('',   Validators.required),
      privatePhone: new FormControl('',   Validators.required),
      email: new FormControl('',   [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      nationality: new FormControl('',   Validators.required),
      status: new FormControl('',   Validators.required),
      linkedinLink: new FormControl('',   Validators.required),
      xingLink: new FormControl('',   Validators.required),
      facebookLink: new FormControl('',   Validators.required),
      youtubeLink: new FormControl('',   Validators.required),

      /*Address*/

      address: new FormControl('',   Validators.required),
      city: new FormControl('',   Validators.required),
      country: new FormControl('',   Validators.required),

      /*Functional Data*/

      institution: new FormControl('',   new FormArray([])),
      skills: new FormControl('',   new FormArray([])),
      department: new FormControl('',   Validators.required),
      jobRole: new FormControl('',   Validators.required),
      jobType: new FormControl('',   Validators.required),
      workLocation: new FormControl('',   Validators.required),

     //roles: new FormControl('',   new FormArray([])),
      emergencyContacts: new FormArray([])
     // historique: new FormControl('',   new FormArray([])),
    });

  }

  ngOnInit(): void {
    this.getSelectedEmployee()

    this.employeesService.getSkills()
    this.employeesService.getInstitution()

    this.skill$ = this.employeesService.skill$;
    this.institution$ = this.employeesService.institution$;

    this.dropdownSettingsSkills = {
      singleSelection: false,
      idField: 'id',
      textField: 'skillName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      //allowSearchFilter: this.ShowFilter
    };
    this.dropdownSettingsInstitution = {
      singleSelection: false,
      idField: 'id',
      textField: 'institutionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      //allowSearchFilter: this.ShowFilter
    };
    this.dropdownSettingsNature = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    }
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
      this.showAdminComp = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');
      this.email = user.email;
  }

  }
  get Sex() {
    return this.createEmployForm.get('gender');
  }
    getSelectedEmployee(){
      this.id  = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.id){
        this.employeesService.getSelectedEmployees(this.id).subscribe(
          ( emp:any)=> {
            this.selectedEmploy=emp;
            if (this.id){
              if (emp) {
                emp.emergencyContacts?.forEach(
                    (emc: any)=>{
                  this.tempoContact?.push({
                    id: emc.id,
                    lastName:emc.lastName,
                    firstName: emc.firstName,
                    gender:emc.gender,
                    phone1:emc.phone1?emc.phone1:null,
                    phone2: emc.phone2?emc.phone2:null,
                    nature: emc.nature?emc.nature:null,
                    email: emc.email,
                    address: emc.address})
                      this.Econtact.insert(0,this.fb.group({
                        id: emc.id,
                        lastName:emc.lastName,
                        firstName: emc.firstName,
                        gender:emc.gender,
                        phone1:emc.phone1?emc.phone1:null,
                        phone2: emc.phone2?emc.phone2:null,
                        email: emc.email,
                        address: emc.address,
                        nature:emc.nature?emc.nature:null,
                      }))
                })
                /*emp.roles.map((role: any) => {
                  this.role.patchValue(role['name'])
                });*/
              }
              this.patchEmployeeForm(emp)
            }
          }
          )
      }
    }
   patchEmployeeForm(selectedEmploy: Employees | undefined) {
    this.editEmployForm!.setValue({

      /*Personal Data*/
      id:selectedEmploy?.id,
      firstName: selectedEmploy?.firstName,
      lastName: selectedEmploy?.lastName,
      gender: selectedEmploy?.gender,
      birthday: selectedEmploy?.birthday,
      businessPhone: selectedEmploy?.businessPhone,
      privatePhone: selectedEmploy?.privatePhone,
      email: selectedEmploy?.email,
      nationality: selectedEmploy?.nationality,
      status: selectedEmploy?.status,
      linkedinLink:selectedEmploy?.linkedinLink,
      xingLink:selectedEmploy?.xingLink,
      facebookLink:selectedEmploy?.facebookLink,
      youtubeLink: selectedEmploy?.youtubeLink,

      /*Address*/

      address: selectedEmploy?.address,
      city: selectedEmploy?.city,
      country: selectedEmploy?.country,

      /*Functional Data*/

      institution: selectedEmploy?.institutions,
      department:selectedEmploy?.department,
      jobRole:selectedEmploy?.jobRole,
      jobType:selectedEmploy?.jobType,
      workLocation: selectedEmploy?.workLocation,
      skills: selectedEmploy?.skills,
      //roles: new FormControl('',   new FormArray([])),
      emergencyContacts: this.tempoContact
      // historique: new FormControl('',   new FormArray([])),
    })
  }
/*  Form getter */
/*
  get historicals(): FormArray{
    if(this.id){return this.editEmployForm.get('historique') as FormArray}
    else {return this.createEmployForm.get('historique') as  FormArray}
  }
*/

  get historicals() : FormArray {
   if (this.id){
     return this.editEmployForm.controls.historique as FormArray
   }
   else {
     return this.createEmployForm.controls.historique as FormArray
   }
  }

  get roleEdit() {
    return this.editEmployForm.get('role');
  }

  get roleCreate() {
    return this.createEmployForm.get('role');
  }


  changeGender(event: { value: any; target: { value: any; }; }) {
    console.log(event.value)
    if (this.id){
      this.sex?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
    else {
      this.sex?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }
  changeDepartment(event: { value: any; target: { value: any; }; }) {
    console.log(event.value)
    if (this.id){
      this.department?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
    else {
      this.department?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }
  changeJobType(event: { value: any; target: { value: any; }; }) {
    console.log(event.target)
    if (this.id){
      this.jobType?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
    else {
      this.jobType?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }

  changeStatus(event: { value: any; target: { value: any; }; }) {
    console.log(event.target)
    if (this.id){
      this.status?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
    else {
      this.status?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }

  changeRole(event: { value: any; target: { value: any; }; }) {
    console.log(event.target.value)
    if (this.id){
      this.role?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
    else {
      this.role?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }
  newHistorical(): FormGroup {
    return this.fb.group({
      id:'',
      year: '',
      entitled: '',
    })
 }
  addHistorical() {
  this.historicals.push(this.newHistorical());
}

  removeHistorical(i:number) {
    this.historicals.removeAt(i);
  }
  onItemSelect(item: any) {
      console.log(item);
    }
  onSelectAll(items: any) {
      console.log(items);
    }
  onSubmit(content: any){
   this.modalService.open(content, {
     centered: true,
     backdrop: 'static'
   });
    if(this.id){
        if(this.editEmployForm.valid){
        this.employeesService.updateEmployee(this.editEmployForm?.value,this.id)
    /*      this.historicals.controls.map(
            f=>{
              this.employeesService.updateHistory(f.value,this.id).subscribe(
                history=>{
                  console.log(history)
                },
                ()=>{
                    this.employeesService.employees$;
                }
              )
            }
        )*/
        }
      }
      else {
        if(this.createEmployForm.valid){
          this.employeesService.createEmployee(this.createEmployForm?.value).subscribe(
            (e:any)=>{;
              this.router.navigateByUrl('/employees')
            },
          );
        }
      }
 }
  newContact(): FormGroup {
    return this.fb.group({
      id: "",
      lastName:"",
      firstName: "",
      gender: "M",
      nature: "",
      phone1: "",
      phone2: "",
      email: "",
      address: ""
    })
  }
  addContact() {
    this.Econtact.push(this.newContact());
  }

  removeContact(i: number) {
    this.Econtact.removeAt(i);
  }
}
