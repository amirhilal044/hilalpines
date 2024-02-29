import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsSevice } from '../../items/shared/items.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private itemsService: ItemsSevice,
    private router: Router
  ) {}
  checkoutItems: any[] = [];

  ngOnInit(): void {
    this.checkoutItems = this.itemsService.getAllItems();
    if (!this.checkoutItems || this.checkoutItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  getAllItems() {
    return this.checkoutItems;
  }

  getSmallTotalPrice(item: any) {
    return parseFloat((item.price * item.quantity).toFixed(2));
  }

  getTotalPrice() {
    const totalPrice = this.checkoutItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return totalPrice.toFixed(2);
  }
  gotocart(): void {
    this.router.navigate(['/cart']);
  }
  processPayment(): void {}
}
