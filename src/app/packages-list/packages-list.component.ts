import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsPackagesCartService } from '../shared/products-packages-cart.service';
import { ProductPackageDto } from '../shared/product-packages.dto';



@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['../shared/product-package.component.scss'],
})
export class PackagesListComponent {
  constructor(private router: Router, private productpackagecartService:ProductsPackagesCartService) {}
  packages :any = []
  packageDetails: any
  showDetails: boolean =false;


  ngOnInit(){
    this.packages = this.productpackagecartService.getPackages()
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
    return this.productpackagecartService.getSelectedQuantity(id)
  }

  addToCart(product: any): void {
    this.productpackagecartService.addToCart(product);
  }

  removeFromCart(product: any): void {
    this.productpackagecartService.removeFromCart(product);
  }

  isSelected(item: ProductPackageDto): boolean {
    return this.productpackagecartService.getSelectedQuantity(item.id)>0;
  }
  getNumberOfCartItems(){
    return this.productpackagecartService.getAllItems().length
  }

  toggleShowDetails(packages:any):void{
    this.packageDetails = packages
    this.showDetails = true
  }

  toggleCloseDetails():void{
    this.packageDetails = null;
    this.showDetails = false
  }
  
}
