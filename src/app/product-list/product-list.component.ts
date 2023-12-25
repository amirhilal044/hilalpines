import { ProductsPackagesCartService } from '../shared/products-packages-cart.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductPackageDto } from '../shared/product-packages.dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  constructor(
    private router: Router,
    private productspackagescartService: ProductsPackagesCartService
  ) {}

  products: any[] = [];

  ngOnInit() {
    this.products = this.productspackagescartService.getProducts();
  }

  redirectToPackages(): void {
    this.router.navigate(['/packages']);
  }

  redirectToCart(): void {
    this.router.navigate(['/cart']);
  }

  getSelectedQuantity(id:number) {
    return this.productspackagescartService.getSelectedQuantity(id)/2
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
