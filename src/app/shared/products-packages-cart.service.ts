import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductPackageDto } from './product-packages.dto';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class ProductsPackagesCartService {

  showConfirmationModal: boolean = false;

  cartItems: ProductPackageDto[] = []

  products: ProductPackageDto[] = [
    {
      id: 101,
      name: 'Product 1',
      price: 20.99,
      description: 'Description for Product 1',
      image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
    },
    {
      id: 102,
      name: 'Product 2',
      price: 23.99,
      description: 'Description for Product 2',
      image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
    },
    // Add more products here
  ];

  packages: ProductPackageDto[] = [
    {
      id: 201,
      name: 'package 1',
      price: 50.99,
      description: 'Description for package 1',
      image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
    },
    {
      id: 202,
      name: 'Package 2',
      price: 23.99,
      description: 'Description for pacakge 2',
      image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
    },
    // Add more products here
  ];

  constructor(private router:Router) {}

  addToCart(item: ProductPackageDto): void {
    this.cartItems.push(item);
    console.log(this.cartItems)
  }

  removeFromCart(item: ProductPackageDto): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
  
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      console.log(this.cartItems);
    }
  }

  getSelectedQuantity(id: number): number {
    const count = this.cartItems.filter(item => item.id === id).length;
    return count;
  }
  
  
  getProducts(): ProductPackageDto[] {
    return this.products;
  }

  getPackages(): ProductPackageDto[] {
    return this.packages;
  }



  getAllItems(): ProductPackageDto[] {
    return this.cartItems;
  }


  
  confirmClearCart(): void {
    this.showConfirmationModal = true;
  }

  // Actual clearCart method called when the user confirms
  clearCart(): void {
    this.cartItems = [];
    this.showConfirmationModal = false;
    this.router.navigate(['/products']);
  }

  // Cancel clearCart method called when the user cancels
  cancelClearCart(): void {
    this.showConfirmationModal = false;
  }
}
