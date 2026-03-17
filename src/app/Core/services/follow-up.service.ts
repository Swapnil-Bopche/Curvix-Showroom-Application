import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IApiResponse, IFollowUp, IFollowUpPayload, IFollowupType } from '../models/interfaces';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class FollowUpService {

  private BaseUrl = environment.apiUrl
  constructor() { }

  _http = inject(HttpClient)

  createFollowup(payload: IFollowUpPayload): Observable<IFollowUpPayload> {
    return this._http.post<IFollowUpPayload>(`${this.BaseUrl}/followup`, payload)
  }

  getFollowupsByCustomerId(customerId: string): Observable<IApiResponse<IFollowUp[]>> {
    return this._http.get<IApiResponse<IFollowUp[]>>(`${this.BaseUrl}/followup/${customerId}`)
  }

  getFollowupTypes(): Observable<IFollowupType[]> {
    return this._http.get<IFollowupType[]>(`${this.BaseUrl}/followupType`)
  }

  // getFollowups(): Observable<IFollowUp[]> {
  //   return this._http.get<IFollowUp[]>(`${this.BaseUrl}/followup`)
  // }
}



