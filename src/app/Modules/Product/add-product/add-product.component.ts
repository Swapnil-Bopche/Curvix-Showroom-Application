import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../../Core/services/product.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { IBrand, IProduct, ITag } from '../model/productInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgFor, NgIf, NgClass } from '@angular/common';

import { error } from 'node:console';
import { IApiResponse } from '../../../Core/models/interfaces';



@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [InputTextModule, SelectModule, ReactiveFormsModule, ButtonModule, MessageModule, ToastModule, FormsModule, NgFor, NgClass],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  productService = inject(ProductService);
  productBrands: IBrand[] = []
  productTags: ITag[] = []

  ProductForm: FormGroup;
  _router = inject(Router)
  _activateRoute = inject(ActivatedRoute)
  _productId!: string
  isEditMode: boolean = false

  formSubmitted = false;
  messageServcie = inject(MessageService)

  constructor(private fb: FormBuilder) {
    this.ProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      stock: [''],
      brand: ['', Validators.required],
      tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.BrandsServer()
    this.TagsServer()

    // extracting paramsId
    this._productId = this._activateRoute.snapshot.paramMap.get('id')!
    if (this._productId) {
      this.isEditMode = true;
      this.getProductById()
    }
  }

  BrandsServer() {
    this.productService.getBrands().subscribe((res: IBrand[]) => {
      this.productBrands = res
      console.log('brands', this.productBrands);

    })
  }
  TagsServer() {
    this.productService.getTags().subscribe((res: ITag[]) => {
      this.productTags = res
      console.log('tags', this.productTags);
    })
  }

  getProductById() {
    // load data & patch value
    this.productService.getProductById(this._productId).subscribe({
      next: (res: IApiResponse<IProduct>) => {
        if (res) {
          const productDetls = res.data
          this.ProductForm.patchValue({
            name: productDetls.name,
            price: productDetls.price,
            discount: productDetls.discount,
            stocl: productDetls.stock,
            brand: productDetls.brand._id,
            tag: productDetls.tag._id
          })
        }
      },
      error: (err) => {
        this.messageServcie.add({
          severity: 'error',
          summary: "Error",
          detail: "Failed to load product"
        })
      }
    })
  }


  submit() {
    this.formSubmitted = true
    if (!this.ProductForm.valid) return
    this.isEditMode ? this.updateProduct() : this.createProduct()
  }

  createProduct() {
    this.productService.createProduct(this.ProductForm.value).subscribe({
      next: (res: IApiResponse<IProduct>) => {
        if (res) {
         console.log('full product data:', res);
          
          alert(res.message || 'product added successfully!')
          this.redirectedToProductlist()
          this.showSuccess('Product Created')
          this.clearField()
        }
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  updateProduct() {
    this.productService.updateProductById(this._productId, this.ProductForm.value).subscribe({
      next: (res: IApiResponse<IProduct>) => {
        if (res) {
          alert(res.message);
          console.log(this.ProductForm.value, 'bta');
          
          this.redirectedToProductlist()
          this.showSuccess('Product Updated')
          this.clearField()
        }
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  showSuccess(message: string) {
    this.messageServcie.add({
      severity: 'success',
      summary: "Success",
      detail: message
    })

  }
  handleError(err: string) {
    console.log('API error', err);
    this.messageServcie.add({
      severity: 'error',
      summary: 'Error',
      detail: err || 'Something went wrong'
    })

  }

  redirectedToProductlist() {
    this._router.navigate(['/product-list']);
  }

  isInvalid(controlName: string) {
    const control = this.ProductForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  clearField(){
    this.ProductForm.reset()
  }
}
