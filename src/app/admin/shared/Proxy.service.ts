import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsDto } from 'src/app/items/shared/items.dto';
import { environment } from 'src/environments/envonment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private httpClient: HttpClient) {}

  getAllItems(): Observable<ItemsDto[]> {
    return this.httpClient.get<ItemsDto[]>(
      `${environment.apiBaseUrl}/product`
    );
  }

  getItemById(id: number): Observable<ItemsDto> {
    return this.httpClient.get<ItemsDto>(
      `${environment.apiBaseUrl}/product/${id}`
    );
  }

  createItem(
    createItemDto: ItemsDto
  ): Observable<ItemsDto> {
    console.log(createItemDto)
    return this.httpClient.post<ItemsDto>(
      `${environment.apiBaseUrl}/product`,
      createItemDto
    );
  }

  updateIem(
    id: number,
    updateProductDto: ItemsDto
  ): Observable<ItemsDto> {
    return this.httpClient.put<ItemsDto>(
      `${environment.apiBaseUrl}/product/${id}`,
      updateProductDto
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiBaseUrl}/product/${id}`
    );
  }
}
