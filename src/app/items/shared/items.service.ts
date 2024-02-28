import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsDto } from './items.dto';

@Injectable({
  providedIn: 'root',
})
export class ItemsSevice {
  cartItems: ItemsDto[] = [];

  constructor(private router: Router) {}

  addToCart(item: ItemsDto): void {
    this.cartItems.push(item);
  }

  removeFromCart(item: ItemsDto): void {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getSelectedQuantity(id: number): number {
    const count = this.cartItems.filter((item) => item.id === id).length;
    return count;
  }

  getAllItems(): ItemsDto[] {
    return this.aggregateItems(this.cartItems);
  }

  aggregateItems(inputArray: any[]) {
    const result = [];
    const itemMap = new Map();
    inputArray.forEach((item) => {
      const itemId = item.id;
      const itemType = item.type;

      // If the item is already in the map, update the quantity
      if (itemMap.has(itemId)) {
        itemMap.get(itemId).quantity += itemType === 'product' ? 0.5 : 1;
      } else {
        // If the item is not in the map, add it with a quantity of 1
        itemMap.set(itemId, {
          ...item,
          quantity: itemType === 'product' ? 0.5 : 1,
        });
      }
    });
    result.push(...itemMap.values());
    return result;
  }

  clearCart(): void {
    this.cartItems = [];
    this.router.navigate(['/products']);
  }
}
