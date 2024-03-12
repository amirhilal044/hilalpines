import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CartService } from '../items/shared/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  numberOfCartItems: number = 0;
  constructor(
    private router: Router,
    private readonly cartService: CartService
  ) {}
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home'],
      styleClass: 'bold-label p-2',
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: ['/about'],
      styleClass: 'bold-label p-2',
    },
    {
      label: 'Products',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/items'],
      styleClass: 'bold-label p-2',
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-phone',
      routerLink: ['/contact'],
      styleClass: 'bold-label p-2',
    },
  ];
  ngOnInit() {
    this.numberOfCartItems = this.getNumberOfCartItems();
  }

  ngDoCheck() {
    this.numberOfCartItems = this.getNumberOfCartItems();
  }
  redirectToCart(): void {
    this.router.navigate(['/cart']);
  }
  getNumberOfCartItems() {
    return this.cartService.getAllItems().length;
  }
}
