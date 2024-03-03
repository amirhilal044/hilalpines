import { Component } from '@angular/core';
import { ItemsSevice } from '../shared/items.service';

@Component({
  selector: 'app-items-nav',
  templateUrl: './items-nav.component.html',
  styleUrls: ['./items-nav.component.scss'],
})
export class ItemsNavComponent {
  activeIndex: number;

  constructor(private itemsService: ItemsSevice){}
  ngOnInit() {
    this.itemsService.navTab == 'offers'? this.activeIndex = 1: this.activeIndex = 0
    console.log(this.activeIndex);
  }


}
