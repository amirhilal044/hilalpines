import { Component } from '@angular/core';
import { CartService } from '../items/shared/cart.service';
import { ProxyService } from './../admin/shared/Proxy.service';
import { ItemsService } from '../items/shared/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  offers: any = [];
  products: any = [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  isLoggedIn: boolean = false;

  constructor(private readonly itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.getAllItems().subscribe((items) => {
      this.offers = items.filter((item) => item.type.type === 'offer');
      this.products = items.filter((item) => item.type.type === 'product');
    });
  }
}
