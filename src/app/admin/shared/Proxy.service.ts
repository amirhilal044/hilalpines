import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPackageDto } from 'src/app/items/shared/product-packages.dto';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private baseUrl = 'http://localhost:3000'; // Replace with your backend API base URL

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<ProductPackageDto[]> {
    return this.httpClient.get<ProductPackageDto[]>(`${this.baseUrl}/product`);
  }

  getProductById(id: number): Observable<ProductPackageDto> {
    return this.httpClient.get<ProductPackageDto>(`${this.baseUrl}/product/${id}`);
  }

  createProduct(createProductDto: ProductPackageDto): Observable<ProductPackageDto> {
    return this.httpClient.post<ProductPackageDto>(`${this.baseUrl}/product`, createProductDto);
  }

  updateProduct(id: number, updateProductDto: ProductPackageDto): Observable<ProductPackageDto> {
    return this.httpClient.put<ProductPackageDto>(`${this.baseUrl}/product/${id}`, updateProductDto);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/product/${id}`);
  }
}
