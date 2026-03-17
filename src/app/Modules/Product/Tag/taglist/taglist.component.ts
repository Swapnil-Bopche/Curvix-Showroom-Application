import { Component, inject, ViewChild } from '@angular/core';


import { Table, TableModule } from 'primeng/table';


import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../Core/services/product.service';
import { ITag } from '../../model/productInterface';

@Component({
  selector: 'app-taglist',
  imports: [TableModule, RouterLink, IconFieldModule, InputIconModule, InputTextModule, ButtonModule],
  templateUrl: './taglist.component.html',
  styleUrl: './taglist.component.css'
})
export class TaglistComponent {

  @ViewChild('dt2') dt: Table | undefined
      statuses!: any[];
    
      loading: boolean = true;
    
      activityValues: number[] = [0, 100];
    
      constructor() { }
    
      private productService = inject(ProductService)
      Tags: ITag[] = []
    
      ngOnInit() {
        this.TagsServer()
      }
    
      TagsServer() {
        this.productService.getTags().subscribe((res:ITag[]) => {
          this.Tags = res;
          this.loading = false
          console.log(this.Tags);
    
        });
      }
    
      clear(table: Table) {
        table.clear();
      }
    
      applyfilterGlobal($event:any, stringVal:any){
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal)
      }
    

}
