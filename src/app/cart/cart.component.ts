// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductPackageDto } from '../shared/product-packages.dto';
import { ProductsPackagesCartService } from '../shared/products-packages-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: ProductPackageDto[] = [];
  showConfirmationModal: boolean = false; // Add this line

  constructor( private productpackagecartService:ProductsPackagesCartService, private router:Router) {}

  ngOnInit(): void {
    this.cartItems = this.productpackagecartService.getAllItems();
  }

  closeCart(): void {
    this.router.navigate(['/products'])
  }

 

  clearCart(): void {
    this.showConfirmationModal = true;
  }

  confirmClearCart(): void {
    this.productpackagecartService.clearCart();
    this.showConfirmationModal = false; // Close the confirmation modal after clearing the cart
  }
  
  cancelClearCart(): void {
    this.showConfirmationModal = false; // Close the confirmation modal without clearing the cart
  }

  checkout(): void {
    // Add logic for checkout here
    // You can navigate to a checkout page or perform any other checkout action
  }
}
