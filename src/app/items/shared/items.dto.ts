import { SafeUrl } from '@angular/platform-browser';
// product.dto.ts
export class ItemsDto {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    type: string
}


export class CartItemDto {
  id: number;
  name: string;
  price: number;
  type: string;
  quantity: number
}
