import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccessories, IApiResponse, ISell } from '../models/interfaces';
import { IVehicleOrder } from '../../Modules/Sell/sell-list/model/vehicleOrderInterface';


@Injectable({
  providedIn: 'root'
})
export class SellService {

  constructor() { }

  _http = inject(HttpClient)
  private BaseUrl: string = 'http://localhost:1600'

  getSellById(customerId: string): Observable<ISell> {
    // This method will be used to fetch sell details by customerId
    return this._http.get<ISell>(`${this.BaseUrl}/sell/${customerId}`);
  }

  getSells(): Observable<ISell[]> {
    return this._http.get<ISell[]>(`${this.BaseUrl}/sell`)
  }

  getAccessories(): Observable<IAccessories[]> {
    return this._http.get<IAccessories[]>(`${this.BaseUrl}/accessories`)
  }

  placeVehicleOrder(payload: IVehicleOrder) {
    return this._http.post(`${this.BaseUrl}/vehicleOrder/create`, payload)
  }

  getVehicleOrders(): Observable<IApiResponse<IVehicleOrder[]>> {
    return this._http.get<IApiResponse<IVehicleOrder[]>>(`${this.BaseUrl}/vehicleOrder/getVehicleOrders`)
  }

  deleteVehicleOrder(id: string) {
    return this._http.delete(`${this.BaseUrl}/vehicleOrder/deleteVehicleOrderId/${id}`)
  }
}
