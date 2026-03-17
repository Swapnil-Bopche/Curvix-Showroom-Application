import { Component, inject, ViewChild } from '@angular/core';


import { Table, TableModule } from 'primeng/table';


import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IBrand } from '../../model/productInterface';
import { ProductService } from '../../../../Core/services/product.service';
@Component({
  selector: 'app-brandlist',
  imports: [TableModule, RouterLink, IconFieldModule, InputIconModule, InputTextModule, ButtonModule],
  templateUrl: './brandlist.component.html',
  styleUrl: './brandlist.component.css'
})
export class BrandlistComponent {

  @ViewChild('dt2') dt: Table | undefined
        statuses!: any[];
      
        loading: boolean = true;
      
        activityValues: number[] = [0, 100];
      
        constructor() { }
      
        private productService = inject(ProductService)
        Brands: IBrand[] = []
      
        ngOnInit() {
          this.TagsServer()
        }
      
        TagsServer() {
          this.productService.getBrands().subscribe((res:IBrand[]) => {
            this.Brands = res;
            this.loading = false
            console.log(this.Brands);
      
          });
        }
      
        clear(table: Table) {
          table.clear();
        }
      
        applyfilterGlobal($event:any, stringVal:any){
          this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal)
        }
      
}
