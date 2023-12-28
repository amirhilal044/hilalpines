import { Component } from '@angular/core';
import { ProductsPackagesCartService } from '../shared/products-packages-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  constructor(private productpackagecartService:ProductsPackagesCartService){}
  checkoutItems: any[] = [];

  ngOnInit(): void {
    this.checkoutItems = this.productpackagecartService.getAllItems();
  }

  getAllItems() {
    return this.checkoutItems;
  }

  getSmallTotalPrice(item: any) {
    return parseFloat((item.price * item.quantity).toFixed(2));
  }
}
