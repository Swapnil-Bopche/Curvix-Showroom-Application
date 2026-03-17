import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, ICustomer } from '../models/interfaces';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private BaseUrl: string = 'http://localhost:1600'

  constructor() { }

  http = inject(HttpClient)

  getCustomers(): Observable<IApiResponse<ICustomer[]>> {
    return this.http.get<IApiResponse<ICustomer[]>>(`${this.BaseUrl}/customer`)
  }
  // http://localhost:1600/api/customer/getCustomers

  createCustomer(payload: string): Observable<ICustomer> {
    return this.http.post<ICustomer>(`${this.BaseUrl}/customer`, payload)
  }

  getCustomerById(customerId:string): Observable<IApiResponse<ICustomer>> {
    return this.http.get<IApiResponse<ICustomer>>(`${this.BaseUrl}/customer/${customerId}`)
  }
}
