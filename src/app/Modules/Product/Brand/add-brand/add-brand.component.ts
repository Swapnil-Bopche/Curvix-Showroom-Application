import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../Core/services/product.service';

@Component({
  selector: 'app-add-brand',
  imports: [InputTextModule, SelectModule, ReactiveFormsModule, ButtonModule, MessageModule, ToastModule, FormsModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {
  formSubmitted = false
  _fb = inject(FormBuilder)
  messageService = inject(MessageService)
  productService = inject(ProductService)
  _router = inject(Router)

  BrandForm: FormGroup = this._fb.group({
    name: ['', Validators.required]
  })

  SubmitBrand() {
    this.formSubmitted = true
    if (this.BrandForm.valid) {
      this.productService.createBrand(this.BrandForm.value).subscribe((res) => {
        this.formSubmitted = false
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Brand Added', life: 3000 });
        setTimeout(() => {
          this._router.navigate(['/brand-list'])
        }, 3000)
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill the required fields', life: 3000 });
    }
  }

  isInvalid(controlName: string) {
    const control = this.BrandForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
