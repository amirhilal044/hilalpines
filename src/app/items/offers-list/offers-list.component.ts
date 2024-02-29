import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDto, ItemsDto } from '../shared/items.dto';
import { ItemsSevice } from '../shared/items.service';
import { ProxyService } from './../../admin/shared/Proxy.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['../shared/items.component.scss'],
})
export class PackagesListComponent {
  constructor(
    private router: Router,
    private proxyService: ProxyService,
    private itemsService: ItemsSevice
  ) {}
  packages: any[];
  packageDetails: any;
  showDetails: boolean = false;

  ngOnInit() {
    this.proxyService.getAllItems().subscribe((items) => {
      this.packages = items.filter((item) => item.type === 'offer');
    });
  }

  getSelectedQuantity(id: number) {
    return this.itemsService.getSelectedQuantity(id);
  }

  addToCart(item: ItemsDto): void {
    // Create a new object without the image property
    const _offer: CartItemDto = {
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.type,
    };
    this.itemsService.addToCart(_offer);
  }

  removeFromCart(item: ItemsDto): void {
    const id = item.id;

    this.itemsService.removeFromCart(id);
  }

  isSelected(item: ItemsDto): boolean {
    return this.itemsService.getSelectedQuantity(item.id) > 0;
  }
  getNumberOfCartItems() {
    return this.itemsService.getAllItems().length;
  }

  showDialog(_package: any) {
    // First, hide all other dialogs
    this.packages.forEach((p) => (p.showDetails = false));
    // Then, show the dialog for the clicked product
    _package.showDetails = true;
  }
}
