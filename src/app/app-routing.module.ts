import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { ItemUploadComponent } from './admin/item-upload/item-upload.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './admin/shared/auth.guard';
import { CheckoutComponent } from './checkoutAndPay/checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './items/cart/cart.component';
import { ItemsNavComponent } from './items/items-nav/items-nav.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'item-upload',
        component: ItemUploadComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'items',
    component: ItemsNavComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  // {
  //   path: 'user-info',
  //   component: UserInfoComponent,
  // },
  {
    path: 'contact',
    component: ContactComponent,
  },
  // {
  //   path: 'new-product-upload',
  //   component: CrudComponent,
  // },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
