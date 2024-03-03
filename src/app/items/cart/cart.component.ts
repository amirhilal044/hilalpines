// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ItemsDto } from '../shared/items.dto';
import { ItemsSevice } from '../shared/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showDetails: boolean = false;

  constructor(
    private itemsService: ItemsSevice,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.itemsService.getAllItems();
  }

  ngDoCheck(): void {
    this.cartItems = this.itemsService.getAllItems();
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
      accept: () => this.itemsService.clearCart(),
      reject: () => {},
    });
  }

  addToCart(item: ItemsDto): void {
    this.itemsService.addToCart(item);
  }
  removeFromCart(item: any): void {
    const id = item.id
    this.itemsService.removeFromCart(id);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
  isSelected(item: ItemsDto): boolean {
    return this.itemsService.getSelectedQuantity(item.id) > 0;
  }

  getSelectedQuantity(id: number) {
    return this.itemsService.getSelectedQuantity(id);
  }

  showDialog(): void {
    this.showDetails = true;
  }
}
