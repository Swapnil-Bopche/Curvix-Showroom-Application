import { Component, inject, ViewChild } from '@angular/core';


import { Table, TableModule } from 'primeng/table';


import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

import { EmployeeService } from '../../../../Core/services/employee.service';
import { IPost } from '../../../../Core/models/interfaces';

@Component({
  selector: 'app-post-list',
  imports: [TableModule, RouterLink, IconFieldModule, InputIconModule, InputTextModule, ButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  @ViewChild('dt2') dt: Table | undefined
    statuses!: any[];
  
    loading: boolean = true;
  
    activityValues: number[] = [0, 100];
  
    constructor() { }
  
    private employeeService = inject(EmployeeService)
    ShowroomPosts: IPost[] = []
  
    ngOnInit() {
      this.DesignationServer()
    }
  
    DesignationServer() {
      this.employeeService.getPosts().subscribe((res:IPost[]) => {
        this.ShowroomPosts = res;
        this.loading = false
        console.log(this.ShowroomPosts);
  
      });
    }
  
    clear(table: Table) {
      table.clear();
    }
  
    applyfilterGlobal($event:any, stringVal:any){
      this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal)
    }
  
  
}
