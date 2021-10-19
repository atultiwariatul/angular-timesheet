import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import {
  FormBuilder,
  Validators,
  FormGroup,
  NgForm,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import * as moment from 'moment';
import {Employee} from "../../model/employee";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employee = new Employee();
  isAccepted:number=0;
  form: FormGroup;
  isError = false;
  error:string;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) {firstName,lastName,
      emailId, role, userName, dob}:Employee ) {
    this.form = fb.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      email: [emailId,Validators.required],
      userName: [userName,Validators.required],
      dob: [dob,Validators.required],
      role: [role,Validators.required],
      releasedAt: [moment(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.form.value.firstName, [
        Validators.required,
        Validators.minLength(4)
        // this.forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      lastName: new FormControl(this.form.value.lastName, [
        Validators.required,
        Validators.minLength(4)
        // this.forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      userName: new FormControl(this.form.value.userName, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      dob: new FormControl(this.form.value.dob),
      role: new FormControl(this.form.value.role),
      isAccepted: new FormControl(this.form.value.isAccepted),
      email: new FormControl(this.form.value.email, Validators.email)
    });
    console.log("Create Employee Data"+JSON.stringify(this.form.value))
  }

  onFormSubmit(form:NgForm) {
    this.employeeService.createEmployee(this.employee)
      .subscribe(
        data => {
          console.log(data)
          this.dialogRef.close("onFormSubmit:CreateEmployee:Form Value:"+JSON.stringify(this.employee))
        }, error => {
          console.log(error);
          console.log("Error in Creating:"+error.error.message);
          this.isError = true;
          this.error=error.error.message;
        });


  }

  onChange($event: MatSlideToggleChange) {
    // @ts-ignore
    if (event.returnValue == true) {
      this.isAccepted = 1;
    } else {
      this.isAccepted = 0;
    }
  }
}

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
