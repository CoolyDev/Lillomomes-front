import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeesService} from "@modules/employees/services/employees.service";
import {UserService} from "@modules/auth/services";

@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public employeeEmailForm: FormGroup;
    constructor(public fb: FormBuilder, private userService:UserService) {
      this.employeeEmailForm=this.fb.group({
        email: new FormControl('',   Validators.required),
      })
    }
    ngOnInit() {}

  onSubmit() {
    this.userService.sendEmployeeEmail(this.employeeEmailForm.get('email')?.value)
  }
}
