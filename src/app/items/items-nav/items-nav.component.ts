import { Component } from '@angular/core';
import { ItemsService } from '../shared/items.service';

@Component({
  selector: 'app-items-nav',
  templateUrl: './items-nav.component.html',
  styleUrls: ['./items-nav.component.scss'],
})
export class ItemsNavComponent {
  activeIndex: number;

  constructor(private itemsService: ItemsService){}
  ngOnInit() {
    this.itemsService.navTab == 'offers'? this.activeIndex = 1: this.activeIndex = 0
  }


}
