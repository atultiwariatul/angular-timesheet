import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {tap} from "rxjs/operators";
import {UpdateEmployeeComponent} from "../update-employee/update-employee.component";
import {MatDialog} from "@angular/material/dialog";
import {from, Observable} from "rxjs";
import {Employee} from "../../model/employee";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {CreateEmployeeComponent} from "../create-employee/create-employee.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit  {
  employees: Observable<Employee[]>;
  displayedColumns: string[] = ['firstName', 'lastName', 'emailId', 'active'];
  dataSource = new MatTableDataSource<Employee[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  private activatedRow: any;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private dialog: MatDialog) {}
  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource = this.employees;
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  openDialog(action:string ,param2: {}) {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      width: '250px',
      data:param2
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        //this.addRowData(result.data);
      }else if(result.event == 'Update'){
        // this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        // this.deleteRowData(result.data);
      }
    });
  }

  updateEmployeeDialog(row: Employee) {
    console.log(row);
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: {
        selectedEmployee: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`updateEmployeeDialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.reloadData();
  }

  addEmployeeDialog(add: string, param2: {}) {
    console.log("Add :"+add);
    console.log("Data:"+param2);
    const dialogRef = this.dialog.open(CreateEmployeeComponent
      , {
      data: {
        selectedEmployee: param2
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`addEmployeeDialog result: ${result}`);
      this.reloadData();
    });
  }

  // addRowData(row_obj: Employee){
  //   this.dataSource.data.push({
  //     row_obj
  //   });
  //   this.dataSource.renderRows();
  //
  // }
  // updateRowData(row_obj: any){
  //   this.dataSource = this.dataSource.filter((value,key)=>{
  //     if(value.id == row_obj.id){
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }
  // deleteRowData(row_obj: any){
  //   this.dataSource = this.dataSource.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
  // }
}

