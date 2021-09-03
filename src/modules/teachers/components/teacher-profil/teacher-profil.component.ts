import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { TokenStorageService } from '@modules/auth/services/tokenstorageservice.service';
import {Teacher} from '@modules/employees/models';
import {TeacherService} from '@modules/teachers/services/teacher.service';
@Component({
  selector: 'sb-teacher-profil',
  templateUrl: './teacher-profil.component.html',
  styleUrls: ['./teacher-profil.component.scss']
})
export class TeacherProfilComponent implements OnInit {
  isLoggedIn = false;
  isEditProfil = false;
  username?: string;
  public editTeacherForm?: FormGroup;
  email?: string;
  keys = Object.keys;
  selectedTeacher: any;
   idTeacher:any;
  get gender() {
    {return this.editTeacherForm?.get('gender');
    }
  }

  constructor(
              private tokenStorageService:TokenStorageService, 
              private teacherService:TeacherService,
              public fb: FormBuilder,
              private activatedRoute:ActivatedRoute,
              ) { 

    this.editTeacherForm = this.fb.group({
      firstName: new FormControl('',   Validators.required),
      lastName: new FormControl('',   Validators.required),
      gender: new FormControl('M',   Validators.required),
      // jobRole: new FormControl('',   Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      privatePhone: new FormControl('',   Validators.required)
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.idTeacher=this.activatedRoute.snapshot.paramMap.get('id')
    if (this.isLoggedIn) {
    /*  const teacher = this.tokenStorageService.getUser();
      this.selectedTeacher=teacher*/
      if (this.idTeacher){
        this.teacherService.getSelectedTeacher(this.idTeacher).subscribe(
          ( teacher:any)=> {
              console.log(teacher)
              this.selectedTeacher=teacher;
              this.patchTeacherForm(teacher)
            }
          )
      }
    }
  }
  editProfil(){
    this.isEditProfil=!this.isEditProfil
  }
  changeGender(event: { value: any; target: { value: any; }; }) {
    console.log(event.value)
    if (this.idTeacher) {
      this.gender?.setValue(event.target?.value, {
        onlySelf: true
      })
    } else {
      this.gender?.setValue(event.target?.value, {
        onlySelf: true
      })
    }
  }
  patchTeacherForm(teacher: Teacher | undefined) {
    this.editTeacherForm!.setValue({
      firstName: teacher?.firstName,
      lastName: teacher?.lastName,
      gender:teacher?.gender,
      // jobRole: teacher?.jobRole,
      email: teacher?.email,
      privatePhone:teacher?.privatePhone
    })
    console.log(this.editTeacherForm?.value)
  }
  onSubmit(){
    if(this.editTeacherForm?.valid){
      this.teacherService.updateTeacher(this.editTeacherForm.value,this.idTeacher)
    }
  }
  dismiss(){
    this.isEditProfil=false
  }
}
