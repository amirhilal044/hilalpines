import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ItemsSevice } from '../items/shared/items.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private readonly itemsSevice: ItemsSevice
  ) {}
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home'],
      styleClass: 'bold-label',
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: ['/about'],
      styleClass: 'bold-label',
    },
    {
      label: 'Products',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/items'],
      styleClass: 'bold-label',
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-phone',
      routerLink: ['/contact'],
      styleClass: 'bold-label',
    },
  ];

  redirectToCart(): void {
    this.router.navigate(['/cart']);
  }
  getNumberOfCartItems() {
    return this.itemsSevice.getAllItems().length;
  }
}
