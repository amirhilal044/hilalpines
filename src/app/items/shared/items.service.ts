import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartItemDto, ItemsDto } from './items.dto';

@Injectable({
  providedIn: 'root',
})
export class ItemsSevice {
  private cartItems: CartItemDto[] = [];
  navTab: string = '';

  constructor(private router: Router, private cookieService: CookieService) {
    this.initializeCartItemsFromCookies();
  }

  private initializeCartItemsFromCookies(): void {
    const cartItemsCookie = this.cookieService.get('cartItems');
    if (cartItemsCookie) {
      this.cartItems = JSON.parse(cartItemsCookie);
    }
  }

  addToCart(item: CartItemDto): void {
    this.cartItems.push(item);
    this.updateCartItemsInCookies();
  }

  removeFromCart(id: number): void {
    const index = this.cartItems.findIndex((cartItem) => cartItem.id === id);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartItemsInCookies();
    }
  }

  getSelectedQuantity(id: number): number {
    return this.cartItems.filter((item) => item.id === id).length;
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
    this.cookieService.delete('cartItems');
    this.router.navigate(['/products']); // Ensure correct navigation
  }

  private updateCartItemsInCookies(): void {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);
    this.cookieService.set(
      'cartItems',
      JSON.stringify(this.aggregateItems(this.cartItems)),
      expirationDate
    );
  }
}
