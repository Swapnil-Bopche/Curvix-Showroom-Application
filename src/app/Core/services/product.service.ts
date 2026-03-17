import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IBrand, IProduct, IProductListResponse, ITag } from '../models/interfaces';
import { IProductPayload } from '../../Modules/Product/model/productInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BaseUrl: string = 'http://localhost:1600'

  constructor() { }

  http = inject(HttpClient)

  getProducts(
    keyword: string = '',
    page: number = 1,
    limit: number = 5
  ): Observable<IProductListResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (keyword.trim()) {
      params = params.set('keyword', keyword.trim())
    }


    return this.http.get<IProductListResponse>(`${this.BaseUrl}/product`, { params })
  }

  getProductById(productId: string): Observable<IApiResponse<IProduct>> {
    return this.http.get<IApiResponse<IProduct>>(`${this.BaseUrl}/product/${productId}`)
  }

  updateProductById(productId: string, payload: IProductPayload): Observable<IApiResponse<IProduct>> {
    return this.http.put<IApiResponse<IProduct>>(`${this.BaseUrl}/product/${productId}`, payload)
  }

  deleteProductById(productId: string): Observable<IApiResponse<IProduct>> {
    return this.http.delete<IApiResponse<IProduct>>(`${this.BaseUrl}/product/${productId}`)
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.BaseUrl}/brand/getBrands`)
  }

  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(`${this.BaseUrl}/tag`)
  }

  createProduct(payload: IProduct): Observable<IApiResponse<IProduct>> {
    return this.http.post<IApiResponse<IProduct>>(`${this.BaseUrl}/product`, payload);
  }

  createBrand(payload: IBrand): Observable<IBrand> {
    return this.http.post<IBrand>(`${this.BaseUrl}/brand`, payload);
  }

  createTag(payload: ITag): Observable<ITag> {
    return this.http.post<ITag>(`${this.BaseUrl}/tag`, payload);
  }


}
