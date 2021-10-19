import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../model/employee";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import * as moment from "moment";
import {forbiddenNameValidator} from "../create-employee/create-employee.component";


@Component({
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  employee:Employee;
  isAccepted:number=0;
  form: FormGroup;
  public breakpoint: number;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employee = this.data.selectedEmployee;
    this.form = fb.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      email: [this.employee.emailId,Validators.required],
      userName: [this.employee.userName,Validators.required],
      dob: [this.employee.dob,Validators.required],
      role: [this.employee.role,Validators.required],
      releasedAt: [moment(), Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("Employee Object"+JSON.stringify(this.employee))
    this.form = new FormGroup({
      firstName: new FormControl(this.employee.firstName, [
        Validators.required,
        Validators.minLength(4)
        // this.forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      lastName: new FormControl(this.employee.lastName, [
        Validators.required,
        Validators.minLength(4)
        // this.forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      userName: new FormControl(this.employee.userName, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      dob: new FormControl(this.form.value.dob),
      role: new FormControl(this.form.value.role),
      email: new FormControl(this.form.value.email, Validators.email)
    });
    // console.log("Employee Data"+JSON.stringify(this.data.selectedEmployee))
    console.log("Employee Object"+JSON.stringify(this.employee))
  }

  close(){
    this.dialogRef.close();
    console.log("Dialog Closed")
  }

  save(){
    // @ts-ignore
    this.dialogRef.close("Form Value:"+this.form.value)
    console.log("Dialog Saved")
  }

  onFormSubmit(value: any) {

  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }
  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }
}
