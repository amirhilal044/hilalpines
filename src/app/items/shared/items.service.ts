import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartItemDto, ItemsDto } from './items.dto';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private cartItems: CartItemDto[] = [];
  navTab: string = '';

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit() {
    const cartItemsString = this.cookieService.get('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }
  }
  addToCart(item: CartItemDto): void {
    const cartItemsString = this.cookieService.get('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    this.updateCartItemsInCookies();
  }

  removeFromCart(id: number, type: string): void {
    const cartItemsString = this.cookieService.get('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }
    const index = this.cartItems.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      if (type === 'product') {
        this.cartItems[index].quantity -= 0.5;
      } else if (type === 'offer') {

        this.cartItems[index].quantity -= 1;
      }

      if (this.cartItems[index].quantity <= 0) {
        this.cartItems.splice(index, 1);
      }

      this.updateCartItemsInCookies();
    }
  }

  getSelectedQuantity(id: number): number {
    const cartItemsString = this.cookieService.get('cartItems');
    if (!cartItemsString) {
      return 0;
    }

    const cartItems: CartItemDto[] = JSON.parse(cartItemsString);
    const selectedItem = cartItems.find((item) => item.id === id);
    return selectedItem ? selectedItem.quantity : 0;
  }

  getAllItems(): CartItemDto[] {
    const cartItemsString = this.cookieService.get('cartItems');
    if (!cartItemsString) {
      return []; // Return an empty array if cartItems cookie is not set
    }

    return JSON.parse(cartItemsString);
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
      JSON.stringify(this.cartItems),
      expirationDate
    );
  }
}
