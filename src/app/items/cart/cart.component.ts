// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CartService } from '../shared/cart.service';
import { CartItemDto, ItemsDto } from '../shared/items.dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showDetails: boolean = false;

  constructor(
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getAllItems();
  }

  ngDoCheck(): void {
    this.cartItems = this.cartService.getAllItems();
    if (!this.cartItems || this.cartItems.length === 0) {
      this.router.navigate(['/products']);
    }
  }

  closeCart(): void {
    this.router.navigate(['/items']);
  }

  getAllItems() {
    return this.cartItems;
  }
  getSmallTotalPrice(item: any) {
    return parseFloat((item.price * item.quantity).toFixed(2));
  }

  getTotalPrice() {
    const totalPrice = this.cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return totalPrice.toFixed(2);
  }

  clearCart(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to clear cart?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.cartService.clearCart(),
      reject: () => {},
    });
  }

  addToCart(item: any): void {
    let _quan = 0;
    if (item.type === 'offer') {
      _quan = 1;
    } else if (item.type === 'product') {
      _quan = 0.5;
    }
    const _offer: CartItemDto = {
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.type.type,
      quantity: _quan,
    };
    this.cartService.addToCart(_offer);
  }

  removeFromCart(item: any): void {
    const id = item.id;
    const type = item.type;
    this.cartService.removeFromCart(id, type);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
  isSelected(item: ItemsDto): boolean {
    return this.cartService.getSelectedQuantity(item.id) > 0;
  }

  getSelectedQuantity(id: number) {
    return this.cartService.getSelectedQuantity(id);
  }

  showDialog(): void {
    this.showDetails = true;
  }
}
