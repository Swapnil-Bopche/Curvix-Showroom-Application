import { Component, inject, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SellService } from '../../../Core/services/sell.service';
import { IVehicleOrder } from './model/vehicleOrderInterface';

import { CurrencyPipe } from '@angular/common';
import { IApiResponse } from '../../../Core/models/interfaces';

@Component({
  selector: 'app-sell-list',
  imports: [TableModule, IconFieldModule, InputIconModule, InputTextModule, ToastModule, ButtonModule, CurrencyPipe],
  templateUrl: './sell-list.component.html',
  styleUrl: './sell-list.component.css'
})
export class SellListComponent {

  _sellService = inject(SellService)
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  SellsList: IVehicleOrder[] = []

  @ViewChild('dt2') dt: Table | undefined

  _messageService = inject(MessageService)

  ngOnInit() {
    this.GetAllOrders()
  }

  GetAllOrders() {
    this._sellService.getVehicleOrders().subscribe({
      next: (res: IApiResponse<IVehicleOrder[]>) => {
        this.SellsList = res.data
        console.log('orders', res.data);

      },
      error: (err) => {
        console.error(err);

      }
    })
  }

  clear(table: Table) {
    table.clear();
  }

  applyfilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal)
  }


  DeleteOrderdata(id: string) {
    const isDelete = confirm("Do you want to delete this order");

    if (isDelete) {
      this._sellService.deleteVehicleOrder(id).subscribe({
        next: (res) => {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Order has been deleted', life: 3000 });
          setTimeout(() => {
            this.GetAllOrders()

          }, 3000)
        }
      })
    }
  }
}
