import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IEmployee, IEmployeePayload, IPost } from '../models/interfaces';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private BaseUrl  = environment.apiUrl
  constructor() { }

  http = inject(HttpClient)

  getEmployees(): Observable<IApiResponse<IEmployee[]>> {
    return this.http.get<IApiResponse<IEmployee[]>>(`${this.BaseUrl}/employee`)
  }

  createEmployee(payload: IEmployee): Observable<IApiResponse<IEmployee>> {
      return this.http.post<IApiResponse<IEmployee>>(`${this.BaseUrl}/employee`, payload);
    }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.BaseUrl}/post`)
  }

  getEmployeeById(productId: string): Observable<IApiResponse<IEmployee>> {
      return this.http.get<IApiResponse<IEmployee>>(`${this.BaseUrl}/employee/${productId}`)
    }
  
    updateEmployeeById(productId: string, payload: IEmployeePayload): Observable<IApiResponse<IEmployee>> {
      return this.http.put<IApiResponse<IEmployee>>(`${this.BaseUrl}/employee/${productId}`, payload)
    }
  
    deleteEmployeeById(productId: string): Observable<IApiResponse<IEmployee>> {
      return this.http.delete<IApiResponse<IEmployee>>(`${this.BaseUrl}/employee/${productId}`)
    }
}
