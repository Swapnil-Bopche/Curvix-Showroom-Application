import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellService } from '../../../Core/services/sell.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CurrencyPipe, NgFor } from '@angular/common';
import { MessageService } from 'primeng/api';

import { BaseIcon } from "primeng/icons/baseicon";

import { merge } from 'rxjs';
import { CustomerService } from '../../../Core/services/customer.service';
import { IAccessories, IApiResponse, ICustomer } from '../../../Core/models/interfaces';


@Component({
  selector: 'app-sell',
  imports: [ReactiveFormsModule, FormsModule, NgFor, CurrencyPipe],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {

  _sellService = inject(SellService)
  _activateRoute = inject(ActivatedRoute);
  customerId: string = '';
  Loading: boolean = true;
  customerSrv = inject(CustomerService)
  CustomerDetails!: ICustomer
  ShowrromAccessories: IAccessories[] = []

  //Order summary variables
  vehiclePrice: number = 0
  vehicleDiscount: number = 0
  vehicleDiscountAmount: number = 0
  additionalDiscountAmount: number = 0
  accessoriesPrice: number = 0
  totalPayable: number = 0
  savedAmount: number = 0


  _fb = inject(FormBuilder)


  SellForm: FormGroup = this._fb.group({
    additionalDiscount: ['', Validators.required],
    accessories: ['', Validators.required],
    remark: ['', Validators.required]

  });


  messageService = inject(MessageService)


  private orderedVehicle!: string
  _router = inject(Router)

  ngOnInit() {
    this.customerId = this._activateRoute.snapshot.paramMap.get('id') || '';
    if (this.customerId) {
      this.LoadCustomerById()
    }

    this.AccessoriesServer()
    this.listenFormChanges()

  }

  LoadCustomerById() {
    //we are getting single data okk not aray type data
    this.customerSrv.getCustomerById(this.customerId).subscribe({
      next: (res: IApiResponse<ICustomer>) => {
        if (res.data) {
          this.CustomerDetails = res.data

          this.vehiclePrice = this.CustomerDetails.selectedProduct.price,
            this.vehicleDiscount = this.CustomerDetails.selectedProduct.discount

          this.orderSummary()
        }
      }
    })
  }

  AccessoriesServer() {
    this._sellService.getAccessories().subscribe((res: IAccessories[]) => {
      this.ShowrromAccessories = res
      this.Loading = false
      console.log('All Accessories', res);

    })

  }

  listenFormChanges() {
    this.listenAdditonalDiscount()
    this.listenAccessories()
  }

  listenAdditonalDiscount() {
    this.SellForm.get('additionalDiscount')?.valueChanges.subscribe
      (value => {
        this.additionalDiscountAmount = Number(value) || 0;
        this.orderSummary()
      })
  }

  listenAccessories() {
    this.SellForm.get('accessories')?.valueChanges.subscribe
      (value => {

        const selectedAccessories = this.ShowrromAccessories.find(
          item => item._id == value
        );

        this.accessoriesPrice = selectedAccessories?.price ?? 0;

        this.orderSummary()

      })
  }

  orderSummary() {
    this.vehicleDiscountAmount = (this.vehiclePrice * this.vehicleDiscount) / 100;

    this.totalPayable = ((this.vehiclePrice - this.vehicleDiscountAmount) - (this.additionalDiscountAmount)
      + (this.accessoriesPrice))
    this.savedAmount = ((this.vehicleDiscountAmount) + (this.additionalDiscountAmount))

  }


  resetField() {
    this.SellForm.reset()
  }




}
