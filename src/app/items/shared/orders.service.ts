import { Injectable } from '@angular/core';
import { OrderDto } from './items.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/envonment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) {}

  placeOrder(order:OrderDto) {
    return this.httpClient.post<OrderDto>(
      `${environment.apiBaseUrl}/order`,
      order
    );
  }
}
