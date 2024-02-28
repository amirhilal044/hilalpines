import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsDto } from '../shared/items.dto';
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
    private productpackagecartService: ItemsSevice
  ) {}
  packages: any[];
  packageDetails: any;
  showDetails: boolean = false;

  ngOnInit() {
    this.proxyService.getAllItems().subscribe((items) => {
      this.packages = items.filter(item => item.type === 'offer');
    });
  }

  countItemsWithId(items: number[], targetId: number): number {
    return items.filter((item) => item === targetId).length;
  }

  getSelectedQuantity(id: number) {
    return this.productpackagecartService.getSelectedQuantity(id);
  }

  addToCart(product: any): void {
    this.productpackagecartService.addToCart(product);
  }

  removeFromCart(product: any): void {
    this.productpackagecartService.removeFromCart(product);
  }

  isSelected(item: ItemsDto): boolean {
    return this.productpackagecartService.getSelectedQuantity(item.id) > 0;
  }
  getNumberOfCartItems() {
    return this.productpackagecartService.getAllItems().length;
  }

  showDialog(_package: any) {
    // First, hide all other dialogs
    this.packages.forEach(p => p.showDetails = false);
    // Then, show the dialog for the clicked product
    _package.showDetails = true;
  }
}
