import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private http: HttpClient) {}

  getBusDetails(bus: any) {
    return this.http.post('http://localhost:3000/api/busdetails', bus);
  }

  updateBusDetails(bus: any) {
    return this.http.patch('http://localhost:3000/api/updatebusdetails', bus);
  }
}
