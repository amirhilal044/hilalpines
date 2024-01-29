import { Injectable } from '@angular/core';
import { ProductPackageDto } from './product-packages.dto';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class ProductsPackagesCartService {

  showConfirmationModal: boolean = false;

  cartItems: ProductPackageDto[] = []

  products: ProductPackageDto[] = [];

  packages: ProductPackageDto[] = [];

  constructor(private router:Router) {}


 
    
 

  addToCart(item: ProductPackageDto): void {
    this.cartItems.push(item);
  }

  removeFromCart(item: ProductPackageDto): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
  
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }


  }

  getSelectedQuantity(id: number): number {
    const count = this.cartItems.filter(item => item.id === id).length;
    return count;
  }
  
  
  getProducts(): ProductPackageDto[] {
    this.products = [
      {
        id: 101,
        name: 'Product 1',
        price: 20.99,
        description: 'Description for Product 1',
        image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
        type: "product"
      },
      {
        id: 102,
        name: 'Product 2',
        price: 23.99,
        description: 'Description for Product 2',
        image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
        type: "product"
  
      },
      // Add more products here
    ]
    return this.products;
  }

  getPackages(): ProductPackageDto[] {
    this.packages = [
      {
        id: 201,
        name: 'package 1',
        price: 50.99,
        description: 'Description for package 1',
        image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
        type: "package"
  
      },
      {
        id: 202,
        name: 'Package 2',
        price: 23.99,
        description: 'Description for pacakge 2',
        image_link: 'https://i.imgur.com/bgP0tiQ.jpeg',
        type: "package"
  
      },
      // Add more products here
    ]
    return this.packages;
  }



  getAllItems(): ProductPackageDto[] {
    return this.aggregateItems(this.cartItems);
  }

  aggregateItems(inputArray: any[]) {
    const result = [];
  
    // Create a map to store items based on their 'id'
    const itemMap = new Map();
  
    // Iterate through the inputArray
    inputArray.forEach(item => {
      const itemId = item.id;
      const itemType = item.type;
  
      // If the item is already in the map, update the quantity
      if (itemMap.has(itemId)) {
        itemMap.get(itemId).quantity += itemType === 'product' ? 0.5 : 1;
      } else {
        // If the item is not in the map, add it with a quantity of 1
        itemMap.set(itemId, { ...item, quantity: itemType === 'product' ? 0.5 : 1 });
      }
    });
  
    // Convert the map values back to an array
    result.push(...itemMap.values());
  
    return result;
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
