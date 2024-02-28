import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsDto } from '../shared/items.dto';
import { ItemsSevice } from '../shared/items.service';
import { ProxyService } from './../../admin/shared/Proxy.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../shared/items.component.scss'],
})
export class ProductListComponent {
  constructor(
    private router: Router,
    private productspackagescartService: ItemsSevice,
    private proxyService: ProxyService,
  ) {}
  sanitizedImageUrl!: SafeUrl;
  products: any[];
  showDetails: boolean = false;
  productDetails: any;
  ngOnInit() {
    this.proxyService.getAllItems().subscribe((items) => {
      this.products = items.filter(item => item.type === 'product');
    });
  }

  redirectToCart(): void {
    this.router.navigate(['/cart']);
  }

  getSelectedQuantity(id: number) {
    return this.productspackagescartService.getSelectedQuantity(id) / 2;
  }

  addToCart(product: any): void {
    this.productspackagescartService.addToCart(product);
  }

  removeFromCart(product: any): void {
    this.productspackagescartService.removeFromCart(product);
  }

  isSelected(item: ItemsDto): boolean {
    return this.productspackagescartService.getSelectedQuantity(item.id) > 0;
  }

  getNumberOfCartItems() {
    return this.productspackagescartService.getAllItems().length;
  }

  showDialog(product: any) {
    // First, hide all other dialogs
    this.products.forEach(p => p.showDetails = false);
    // Then, show the dialog for the clicked product
    product.showDetails = true;
  }
}
