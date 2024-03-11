import { Component } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ProxyService } from 'src/app/admin/shared/Proxy.service';
import { CartService } from '../shared/cart.service';
import { CartItemDto, ItemsDto } from '../shared/items.dto';
import { ItemType } from './../shared/items.dto';
import { ItemsService } from './../shared/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  constructor(
    private cartService: CartService,
    private proxyService: ProxyService,
    private itemsService: ItemsService
  ) {}
  items: ItemsDto[];
  tempItems: ItemsDto[];
  showDetails: boolean = false;
  searchTerm$ = new Subject<string>();
  itemsTypes: ItemType[];
  ngOnInit() {
    this.itemsService.getAllItems().subscribe((items) => {
      this.items = items;
      this.tempItems = [...items];
    });

    this.searchTerm$
      .pipe(debounceTime(1000))
      .subscribe((searchTerm: string) => {
        this.filterItemsBySearch(searchTerm);
      });

    this.itemsService.getAllTypes().subscribe((types) => {
      this.itemsTypes = types;
    });
  }

  onSearchUpdated(searchValue: string) {
    this.searchTerm$.next(searchValue);
  }

  filterItemsBySearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      const anyTypeChecked = this.itemsTypes.some(
        (itemType) => itemType.checked
      );
      if (!anyTypeChecked) {
        // If no type is checked and no search term is provided, show all items
        this.items = this.tempItems;
        return;
      }
    }

    // Filter items based on the search term and checked types
    this.items = this.tempItems.filter(
      (item) =>
        (searchTerm.trim() === '' ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!this.itemsTypes.some((itemType) => itemType.checked) ||
          this.itemsTypes.some(
            (itemType) => itemType.checked && itemType.id === item.type.id
          ))
    );
  }

  filterItemsByType(event: any, type: ItemType) {
    type.checked = event.checked;
    const checkedTypes = this.itemsTypes.filter((itemType) => itemType.checked);
    if (checkedTypes.length === 0) {
      this.items = this.tempItems;
      return;
    }
    this.items = this.tempItems.filter((item) =>
      checkedTypes.some((itemType) => item.type.id === itemType.id)
    );
  }

  getSelectedQuantity(id: number) {
    return this.cartService.getSelectedQuantity(id);
  }

  addToCart(item: ItemsDto): void {
    const quantity =
      item.type.type === 'offer' ? 1 : item.type.type === 'product' ? 0.5 : 0;
    const cartItem: CartItemDto = {
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.type.type,
      quantity: quantity,
    };
    this.cartService.addToCart(cartItem);
  }

  removeFromCart(item: ItemsDto): void {
    this.cartService.removeFromCart(item.id, item.type.type);
  }

  isSelected(item: ItemsDto): boolean {
    return this.cartService.getSelectedQuantity(item.id) > 0;
  }

  getNumberOfCartItems() {
    return this.cartService.getAllItems().length;
  }

  showDialog(item: ItemsDto) {
    this.items.forEach((p) => (p.showDetails = false));
    item.showDetails = true;
  }
}
