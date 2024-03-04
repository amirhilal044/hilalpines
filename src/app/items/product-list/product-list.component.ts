import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDto, ItemsDto } from '../shared/items.dto';
import { ItemsService } from '../shared/items.service';
import { ProxyService } from './../../admin/shared/Proxy.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../shared/items.component.scss'],
})
export class ProductListComponent {
  constructor(
    private router: Router,
    private itemsService: ItemsService,
    private proxyService: ProxyService
  ) {}
  products: any[];
  showDetails: boolean = false;
  productDetails: any;
  ngOnInit() {
    this.proxyService.getAllItems().subscribe((items) => {
      this.products = items.filter((item) => item.type === 'product');
    });
  }

  getSelectedQuantity(id: number) {
    return this.itemsService.getSelectedQuantity(id);
  }

  addToCart(item: ItemsDto): void {
    // Create a new object without the image property
    console.log(item)
    const _product: CartItemDto = {
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.type,
      quantity: 0.5
    };
    this.itemsService.addToCart(_product);
  }

  removeFromCart(item: ItemsDto): void {
    const id = item.id;
    const type = item.type
    this.itemsService.removeFromCart(id,type);
  }

  isSelected(item: ItemsDto): boolean {
    return this.itemsService.getSelectedQuantity(item.id) > 0;
  }

  getNumberOfCartItems() {
    return this.itemsService.getAllItems().length;
  }

  showDialog(product: any) {
    // First, hide all other dialogs
    this.products.forEach((p) => (p.showDetails = false));
    // Then, show the dialog for the clicked product
    product.showDetails = true;
  }
}
