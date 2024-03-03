import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ItemsDto } from 'src/app/items/shared/items.dto';
import { environment } from 'src/environments/envonment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private httpClient: HttpClient) {}

  getAllItems(): Observable<ItemsDto[]> {
    return this.httpClient.get<ItemsDto[]>(`${environment.apiBaseUrl}/item`);
  }

  getItemByName(name: string): Observable<ItemsDto> {
    return this.httpClient.get<ItemsDto>(
      `${environment.apiBaseUrl}/item/${name}`
    );
  }

  createItem(createItemDto: ItemsDto): Observable<ItemsDto> {
    return this.httpClient.post<ItemsDto>(
      `${environment.apiBaseUrl}/item`,
      createItemDto
    );
  }

  // updateIem(
  //   id: number,
  //   updateProductDto: ItemsDto
  // ): Observable<ItemsDto> {
  //   return this.httpClient.put<ItemsDto>(
  //     `${environment.apiBaseUrl}/product/${id}`,
  //     updateProductDto
  //   );
  // }

  deleteItem(id: number): Observable<void> {
    const url = `${environment.apiBaseUrl}/item/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.delete<void>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error deleting item:', error);
        return throwError('Error deleting item. Please try again later.');
      })
    );
  }
}
