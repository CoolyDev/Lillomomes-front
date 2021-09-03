import { Component, OnInit, TemplateRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from "@angular/router";
import {Room} from '@modules/classroom/models';
import {ClassroomService} from '@modules/classroom/services';
import {EmergencyContactNature, EmergencyContacts, Institution} from '@modules/employees/models';
import {EmployeesService} from '@modules/employees/services/employees.service';
import {StudentService} from "@modules/student/services/students.service";

import {Students} from "@modules/student/models";
import {ToastService} from '@modules/student/toast/toast-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';



@Component({
  selector: 'sb-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})

export class StudentFormComponent implements OnInit {
  tempoContact: any[] = []
  keys = Object.keys;
  Econtactnature = EmergencyContactNature
  get Econtact(): FormArray {
    if (this.id) {
      return this.editStudentForm.controls.emergencyContacts as FormArray
    } else {
      return this.createStudentForm.controls.emergencyContacts as FormArray
    }
  }

  editStudentForm = new FormGroup({
    code: new FormControl('', Validators.required),
    oldId: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    phone1: new FormControl('', Validators.required),
    phone2: new FormControl('', Validators.required),
    enrollmentDate: new FormControl('', Validators.required),
    institutions: new FormControl(null, Validators.required),
    // course: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    identificationType: new FormControl('', Validators.required),
    identificationNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    profession: new FormControl('', Validators.required),
    schoolName: new FormControl('', Validators.required),
    schoolPlace: new FormControl('', Validators.required),
    schoolType: new FormControl('', Validators.required),
    niveauEtude: new FormControl('', Validators.required),
    serieBac: new FormControl('', Validators.required),
    moyenneBac: new FormControl('', Validators.required),
    systemEtude: new FormControl('', Validators.required),
    emergencyContacts: new FormArray([]),
    email: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
  });
  createStudentForm = new FormGroup({

    oldId: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    phone1: new FormControl('', Validators.required),
    phone2: new FormControl('', Validators.required),
    enrollmentDate: new FormControl('', Validators.required),
    classRoom: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    identificationType: new FormControl('', Validators.required),
    identificationNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    profession: new FormControl('', Validators.required),
    schoolName: new FormControl('', Validators.required),
    schoolPlace: new FormControl('', Validators.required),
    schoolType: new FormControl('', Validators.required),
    niveauEtude: new FormControl('', Validators.required),
    serieBac: new FormControl('', Validators.required),
    moyenneBac: new FormControl('', Validators.required),
    systemEtude: new FormControl('', Validators.required),
    emergencyContacts: new FormArray([]),
    email: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
  });
  selectedStudent: Students | undefined
  id: any
  public isCollapsed = true;
  institution$!: Observable<Institution[]>;
  private classrom$?: Observable<Room[]>;
  dropdownSettingsInstitution: any = {};

  constructor(
      private studentService: StudentService,
      private employeesService: EmployeesService,
      public activatedRoute: ActivatedRoute,
      public toastService: ToastService,
      public classroomService:ClassroomService,
      public modalService:NgbModal,
      public router: Router, public fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getSelectedEmployee()
    this.employeesService.getInstitution()
    this.institution$ = this.employeesService.institution$;
    this.classrom$=this.classroomService.classroom$;
    this.dropdownSettingsInstitution = {
      singleSelection: false,
      idField: 'id',
      textField: 'institutionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
    };
  }

  getSelectedEmployee() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.studentService.getSelectedStudent(this.id).subscribe(
          (student: any) => {
            this.selectedStudent = student;
            if (this.id) {

              student.emergencyContacts?.forEach(
                  (emc: any) => {
                    this.tempoContact?.push({
                      id: emc.id,
                      lastName: emc.lastName,
                      firstName: emc.firstName,
                      gender: emc.gender,
                      phone1: emc.phone1 ? emc.phone1 : null,
                      phone2: emc.phone2 ? emc.phone2 : null,
                      email: emc.email,
                      address: emc.address
                    })
                    this.Econtact.insert(0, this.fb.group({
                      id: emc.id,
                      lastName: emc.lastName,
                      firstName: emc.firstName,
                      gender: emc.gender,
                      phone1: emc.phone1 ? emc.phone1 : null,
                      phone2: emc.phone2 ? emc.phone2 : null,
                      email: emc.email,
                      address: emc.address
                    }))
                  })
              this.patchEmployeeForm(student)
              console.log(this.editStudentForm.value)
            }
          })
    }
  }

  private patchEmployeeForm(selectedStudent: Students | undefined) {
    this.editStudentForm!.setValue({
      code: this.id,
      oldId: selectedStudent?.oldId?selectedStudent?.oldId : null,
      firstName: selectedStudent?.firstName ? selectedStudent?.firstName : null,
      lastName: selectedStudent?.lastName ? selectedStudent?.lastName : null,
      middleName: selectedStudent?.middleName ? selectedStudent?.middleName : null,
      gender: selectedStudent?.gender ? selectedStudent?.gender : null,
      phone1: selectedStudent?.phone1 ? selectedStudent?.phone1 : null,
      phone2: selectedStudent?.phone2 ? selectedStudent?.phone2 : null,
      enrollmentDate: selectedStudent?.enrollmentDate ? selectedStudent?.enrollmentDate : null,
      institutions: selectedStudent?.institutions ? selectedStudent?.institutions : null,
      // course:selectedStudent?.course?selectedStudent?.course:null,
      nationality: selectedStudent?.nationality ? selectedStudent?.nationality : null,
      identificationType: selectedStudent?.identificationType ? selectedStudent?.identificationType : null,
      identificationNumber: selectedStudent?.identificationNumber ? selectedStudent?.identificationNumber : null,
      address: selectedStudent?.address ? selectedStudent?.address : null,
      city: selectedStudent?.city ? selectedStudent?.city : null,
      country: selectedStudent?.country ? selectedStudent?.country : null,
      profession: selectedStudent?.profession ? selectedStudent?.profession : null,
      schoolName: selectedStudent?.schoolName ? selectedStudent?.schoolName : null,
      schoolPlace: selectedStudent?.schoolPlace ? selectedStudent?.schoolPlace : null,
      birthday: selectedStudent?.birthday ? selectedStudent.birthday : null,
      schoolType: selectedStudent?.schoolType ? selectedStudent?.schoolType : null,
      niveauEtude: selectedStudent?.niveauEtude ? selectedStudent?.niveauEtude : null,
      serieBac: selectedStudent?.serieBac ? selectedStudent?.serieBac : null,
      moyenneBac: selectedStudent?.moyenneBac ? selectedStudent?.moyenneBac : null,
      emergencyContacts: this.Econtact.value,
      email: selectedStudent?.email ? selectedStudent?.email : null,
      systemEtude: selectedStudent?.systemEtude ? selectedStudent?.systemEtude : null,
    })
  }

  onSubmit(content: any){
    this.modalService.open(content, {
          centered: true,
          backdrop: 'static'
        });
    if(this.id){
      console.log("update")
      if(this.editStudentForm.valid){
        this.studentService.updateStudent(this.editStudentForm?.value,this.id)
      }
    }
    else {
      console.log("create")
      this.studentService.createStudent(this.createStudentForm?.value)
    }
  }
  get SexEdit() {
    return this.editStudentForm.get('gender');
  }
  get SexCreate() {
    return this.createStudentForm.get('gender');
  }

  changeGender(event: any) {
    console.log(event)
   if (this.id){
     this.SexEdit?.setValue(event.target?.value, {
       onlySelf: true
     })
   }
   else {
     this.SexCreate?.setValue(event.target?.value, {
       onlySelf: true
     })
   }
  }

    changeSociety($event: Event) {
        
    }

  addContact() {
    this.Econtact.push(this.newContact());
  }

  removeContact(i: number) {
    this.Econtact.removeAt(i);
  }

  newContact(): FormGroup {
    return this.fb.group({
      id: "",
      lastName:"",
      firstName: "",
      gender: "M",
      phone1: "",
      phone2: "",
      nature: "",
      email: "",
      address: ""
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  changeRoom($event: Event) {
    console.log($event)
  }
}
