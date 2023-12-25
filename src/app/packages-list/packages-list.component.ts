import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsPackagesCartService } from '../shared/products-packages-cart.service';
import { ProductPackageDto } from '../shared/product-packages.dto';



@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.scss'],
})
export class PackagesListComponent {
  constructor(private router: Router, private productspackagescartService:ProductsPackagesCartService) {}
 
  packages :any = []

  ngOnInit(){
    this.packages = this.productspackagescartService.getPackages()
  }

  countItemsWithId(items: number[], targetId: number): number {
    return items.filter(item => item === targetId).length;
  }


  redirectToProducts(): void {
    this.router.navigate(['/products']);
  }

  redirectToCart(): void{
    this.router.navigate(['/cart'])
  }

  getSelectedQuantity(id:number) {
    return this.productspackagescartService.getSelectedQuantity(id)
  }

  addToCart(product: any): void {
    this.productspackagescartService.addToCart(product);
  }

  removeFromCart(product: any): void {
    this.productspackagescartService.removeFromCart(product);
  }

  isSelected(item: ProductPackageDto): boolean {
    return this.productspackagescartService.getSelectedQuantity(item.id)>0;
  }
}
