import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { ProxyService } from 'src/app/admin/shared/Proxy.service';
import { ItemType, ItemsDto } from './items.dto';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items: ItemsDto[] = [];
  private itemsCacheKey = 'cached_items';
  private typesCacheKey = 'cached_types';
  itemsTypes: ItemType[];
  constructor(private router: Router, private proxyService: ProxyService) {
    // Register the beforeunload event handler
    window.addEventListener('beforeunload', () => {
      this.clearCache();
    });
  }

  getAllItems(): Observable<ItemsDto[]> {
    const cachedItems = sessionStorage.getItem(this.itemsCacheKey);
    if (cachedItems) {
      this.items = JSON.parse(cachedItems);
      return of(this.items); // Return cached items as observable
    } else {
      return this.proxyService.getAllItems().pipe(
        // Cache items in sessionStorage before returning
        tap((items) =>
          sessionStorage.setItem(this.itemsCacheKey, JSON.stringify(items))
        )
      );
    }
  }

  getAllTypes(): Observable<ItemType[]> {
    const cachedTypes = sessionStorage.getItem(this.typesCacheKey);
    console.log(cachedTypes);
    if (cachedTypes) {
      this.itemsTypes = JSON.parse(cachedTypes);
      return of(this.itemsTypes); // Return cached items as observable
    } else {
      return this.proxyService.getAllTypes().pipe(
        // Cache items in sessionStorage before returning
        tap((types) =>
          sessionStorage.setItem(this.typesCacheKey, JSON.stringify(types))
        )
      );
    }
  }
  clearCache() {
    sessionStorage.removeItem(this.itemsCacheKey);
    sessionStorage.removeItem(this.typesCacheKey);
  }
}
