import { Component, inject, ViewChild } from '@angular/core';
import { CustomerService } from '../../../Core/services/customer.service';

import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { log } from 'console';
import { IApiResponse, ICustomer } from '../../../Core/models/interfaces';

@Component({
  selector: 'app-customer-list',
  imports: [TableModule, RouterLink, DialogModule, ButtonModule, IconFieldModule, InputIconModule, InputTextModule, NgIf, ToastModule, ButtonModule, DatePipe, NgFor],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {

  _router = inject(Router)
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  customerService = inject(CustomerService)
  Curvix_Customers: ICustomer[] = []
  @ViewChild('dt2') dt: Table | undefined
  statuses!: any[];

  // loading: boolean = true;


  visible: boolean = false;
  selectedCustomerId: string = ''

  constructor() { }



  ngOnInit() {
    this.LoadCustomers()
  }

  LoadCustomers() {
    this.customerService.getCustomers().subscribe((res: IApiResponse<ICustomer[]>) => {
      this.Curvix_Customers = res.data;
      // this.loading = false
      console.log(this.Curvix_Customers, 'Customer lists');

    });
  }

  clear(table: Table) {
    table.clear();
  }

  applyfilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal)
  }

  openActionDialog(customer: ICustomer) {
    this.visible = true
    this.selectedCustomerId = customer._id


  }

  navigateToFollowup() {
    this._router.navigate(['/follow-up', this.selectedCustomerId])
  }

  navigateToSell() {
    this._router.navigate(['/sell-payment', this.selectedCustomerId])
  }



}
