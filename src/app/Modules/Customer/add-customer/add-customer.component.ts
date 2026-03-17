import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../../Core/services/product.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../../Core/services/customer.service';
import { EmployeeService } from '../../../Core/services/employee.service';

import { DatePickerModule } from 'primeng/datepicker';
import { NgClass, NgFor } from '@angular/common';
import { log } from 'console';
import { IApiResponse, ICustomer, IEmployee, IProduct } from '../../../Core/models/interfaces';

@Component({
  selector: 'app-add-customer',
  imports: [InputTextModule, SelectModule, ReactiveFormsModule, NgClass, ButtonModule, MessageModule, ToastModule, DatePickerModule, NgFor],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  customerService = inject(CustomerService);
  employeeService = inject(EmployeeService);
  productService = inject(ProductService);

  EmployeeOptions: IEmployee[] = []
  ProductOptions: IProduct[] = []
  isEditMode = false

  CustomerForm: FormGroup;
  _router = inject(Router)

  formSubmitted = false;
  messageServcie = inject(MessageService)

  constructor(private fb: FormBuilder) {
    this.CustomerForm = this.fb.group({
      name: ['', Validators.required],
      visitingDate: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assignedEmployee: ['', Validators.required],
      selectedProduct: ['', Validators.required],
      tentativeDate: ['', Validators.required],
      remark: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.EmployeeServer()
    this.ProductServer()
  }

  EmployeeServer() {
    this.employeeService.getEmployees().subscribe((res: IApiResponse<IEmployee[]>) => {
      this.EmployeeOptions = res.data
      console.log(this.EmployeeOptions);

    })
  }
  ProductServer() {
    this.productService.getProducts().subscribe({
      next:(res:IApiResponse<IProduct[]>)=> {
        this.ProductOptions = res.data
      }
    })
  }


  submit() {
    this.formSubmitted = true
    if (this.CustomerForm.valid) {
      this.addCustumer()
    } else {
      this.messageServcie.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields correctly', life: 3000 });
    }

  }

  addCustumer() {
    this.customerService.createCustomer(this.CustomerForm.value).subscribe({
      next: (res: ICustomer) => {
        console.log('customer data', this.CustomerForm.value);
        this.formSubmitted = false
        this.messageServcie.add({ severity: 'success', summary: 'Success', detail: 'New Customer has been added', life: 3000 });
        setTimeout(() => {
          this._router.navigate(['/customer-list'])
        }, 3000)
      },
      error: (err) => {
        console.log('Error creating customer:', err);
        this.messageServcie.add({ severity: 'error', summary: 'Error', detail: 'Failed to add new customer', life: 3000 });
      }
    })
  }

  isInvalid(controlName: string) {
    const control = this.CustomerForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

}
