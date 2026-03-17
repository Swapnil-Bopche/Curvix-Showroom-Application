import { Component, inject, ViewChild } from '@angular/core';
import { ProductService } from '../../../Core/services/product.service';
import { IProduct, ITag } from '../model/productInterface';
import { Table, TableModule } from 'primeng/table';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IApiResponse, IProductListResponse } from '../../../Core/models/interfaces';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [TableModule, RouterLink, IconFieldModule, CurrencyPipe, FormsModule, InputIconModule, InputTextModule, ButtonModule, NgFor, NgClass, NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  @ViewChild('dt2') dt: Table | undefined
  statuses!: any[];

  isloading: boolean = true;
  messageSrv = inject(MessageService)
  activityValues: number[] = [0, 100];

  constructor() { }

  private productService = inject(ProductService)
  ShowroomVehicles: IProduct[] = []
  uniqueCategories: ITag[] = []
  filteredVehicles: IProduct[] = []
  selectedCategory: string = ''
  searchText: string = ''
  currentPage: number = 1
  limit: number = 5
  totalPages: number = 0
  totalRecords: number = 0

  _router = inject(Router)

  _searchSubject = new Subject<string>() //This 'll hold searchtext values temprarlily. Instead of calling API dirctly from input, we send values here first

  ngOnInit() {
    this.productServer()
    this.initSearchListner()
  }

  private initSearchListner() {
    this._searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((val: string) => {
        this.searchText = val
        this.currentPage = 1;
        this.productServer()
      })
  }



  productServer() {
    this.isloading = true
    this.productService.getProducts(this.searchText, this.currentPage, this.limit).subscribe((res: IProductListResponse) => {
      this.ShowroomVehicles = res.data;
      this.filteredVehicles = [...res.data]

      this.totalPages = res.totalPages
      console.log(this.totalPages, 'last');

      this.totalRecords = res.totalRecords
      this.currentPage = res.page

      this.extractUniqueCategories() //for unique dropdown items

      this.isloading = false
      console.log(this.ShowroomVehicles, 'vehi');
      console.log(this.ShowroomVehicles.length, 'length..');


    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.productServer()
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.productServer()
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.productServer()

    }
  }

  get pages(): number[] {
    return Array.from(
      { length: this.totalPages }, (_, i) => i + 1)
  }
  //Meaning if totalPages  =3  or 7 then it becomes [1, 2, 3] or [1, 2, 3, 4, 5, 6, 7]

  extractUniqueCategories() {
    const categoryMap = new Map();

    this.ShowroomVehicles.forEach((prodct => {
      const tag = prodct.tag?.name;

      if (tag && !categoryMap.has(tag)) {
        categoryMap.set(tag, prodct.tag)
      }
    }))

    this.uniqueCategories = Array.from(categoryMap.values())
  }

  filterVehicleByCategory() {

    if (!this.selectedCategory) {
      this.filteredVehicles = [...this.ShowroomVehicles];
      return
    }

    this.filteredVehicles = this.ShowroomVehicles.filter(prod => {
      return prod.tag?._id === this.selectedCategory
    })

    console.log(this.selectedCategory, 'category');
    console.log(this.filteredVehicles, 'filter vehicle');
  }

  onSearch() {
    const cleaned = (this.searchText || '').replace(/\s+/g, '').toLowerCase()
    this._searchSubject.next(cleaned)
  }

  editVehicle(product: IProduct) {
    this._router.navigate(['/product-form', product._id]);
  }

  deleteVehicle(product: IProduct) {
    const confirmed = confirm(`Delete ${product.name} vehicle ?`);

    if (!confirmed) return

    this.productService.deleteProductById(product._id).subscribe({
      next: (res: IApiResponse<IProduct>) => {
        if (res) {
          this.showSuucess(res.message)
        }
      },
      error: (err) => {
        this.handleError(err)
      }
    })

  }

  showSuucess(message: string) {
    this.messageSrv.add({
      severity: "success",
      summary: "Success",
      detail: message
    })
  }

  handleError(err: string) {
    this.messageSrv.add({
      severity: "error",
      summary: "Error",
      detail: err
    })
  }




  clear(table: Table) {
    table.clear();
  }



}
