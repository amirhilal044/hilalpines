import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  // {
  //   path: 'admin',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'offer-upload',
  //   component: OfferUploadComponent,
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'product-upload',
  //   component: ProductUploadComponent,
  //   canActivate: [AuthGuardService],
  // },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'packages',
    component: PackagesListComponent
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
