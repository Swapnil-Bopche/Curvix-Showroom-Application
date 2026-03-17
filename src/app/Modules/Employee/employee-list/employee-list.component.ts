import { Component, inject, ViewChild } from '@angular/core';


import { Table, TableModule } from 'primeng/table';


import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../Core/services/employee.service';

import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { IApiResponse, IEmployee } from '../../../Core/models/interfaces';

@Component({
  selector: 'app-employee-list',
  imports: [TableModule, RouterLink, IconFieldModule, InputIconModule, InputTextModule, ButtonModule, DatePipe, NgFor, NgIf],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  private employeeService = inject(EmployeeService)
  ShowrromEmployees: IEmployee[] = []

  @ViewChild('dt2') dt: Table | undefined
  statuses!: any[];

  loading: boolean = true;
  _router = inject(Router)
  activityValues: number[] = [0, 100];
  message_Srv = inject(MessageService)
  constructor() { }



  ngOnInit() {
    this.EmployeesServer()
  }

  EmployeesServer() {
    this.employeeService.getEmployees().subscribe((res: IApiResponse<IEmployee[]>) => {
      this.ShowrromEmployees = res.data;
      this.loading = false
      console.log(this.ShowrromEmployees);

    });
  }


  editEmployee(employee: IEmployee) {
    this._router.navigate(['/employee-form', employee._id])
  }

  deleteEmployeee(employee: IEmployee) {
    const confirmed = confirm(`Delete ${employee.name} employee ?`);
    
        if (!confirmed) return
    
        this.employeeService.deleteEmployeeById(employee._id).subscribe({
          next: (res: IApiResponse<IEmployee>) => {
            if (res) {
             this.showSuccess(res.message)
            }
          },
          error:(err)=> {
            this.handleError(err)
          }
        })
  }
  

  showSuccess(message: string) {
    this.message_Srv.add({
      severity: 'success',
      summary: "Success",
      detail: message
    })

  }
  handleError(err: string) {
    console.log('API error', err);
    this.message_Srv.add({
      severity: 'error',
      summary: 'Error',
      detail: err || 'Something went wrong'
    })

  }

  clear(table: Table) {
    table.clear();
  }

  applyfilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal)
  }
}
