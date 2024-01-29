import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductPackageDto } from '../shared/product-packages.dto';
import { ProductsPackagesCartService } from '../shared/products-packages-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../shared/product-package.component.scss', '../shared/product-package-two.component.scss'],
})
export class ProductListComponent {
  constructor(
    private router: Router,
    private productspackagescartService: ProductsPackagesCartService
  ) {}

  products: any[] = [];
  showDetails:boolean= false;
  productDetails: any;
  ngOnInit() {
    console.log("before:" , this.products)
    this.products = this.productspackagescartService.getProducts();
    console.log("after:" , this.products)

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

  getNumberOfCartItems(){
    return this.productspackagescartService.getAllItems().length
  }
  
  showDialog():void{
    this.showDetails = true
  }
  
}
