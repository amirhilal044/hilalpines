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
  cartItems: any[] = [];
  showConfirmationModal: boolean = false; 
  showDetails: boolean =false;

  constructor(
    private productpackagecartService: ProductsPackagesCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.productpackagecartService.getAllItems();
  }

  ngDoCheck(): void {
    this.cartItems = this.productpackagecartService.getAllItems();
  }

  closeCart(): void {
    this.router.navigate(['/products']);
  }

  getAllItems() {
    return this.cartItems;
  }
  getSmallTotalPrice(item: any) {
    return parseFloat((item.price * item.quantity).toFixed(2));
  }

  clearCart(): void {
    this.showConfirmationModal = true;
  }


  addToCart(item: any): void {
    this.productpackagecartService.addToCart(item);
  }
  removeFromCart(item: any): void {
    this.productpackagecartService.removeFromCart(item);
  }

  confirmClearCart(): void {
    this.productpackagecartService.clearCart();
    this.showConfirmationModal = false; // Close the confirmation modal after clearing the cart
  }

  cancelClearCart(): void {
    this.showConfirmationModal = false; // Close the confirmation modal without clearing the cart
  }

  checkout(): void {
   this.router.navigate(['/checkout'])
  }
  isSelected(item: ProductPackageDto): boolean {
    return this.productpackagecartService.getSelectedQuantity(item.id)>0;
  }
  toggleShowDetails():void{
    this.showDetails = true
  }
  toggleCloseDetails():void{
    this.showDetails = false
  }

  getSelectedQuantity(id:number) {
    return this.productpackagecartService.getSelectedQuantity(id)
  }
}
