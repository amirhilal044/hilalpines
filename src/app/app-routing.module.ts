import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './items/cart/cart.component';
import { CheckoutComponent } from './checkoutAndPay/checkout/checkout.component';
import { PackagesListComponent } from './items/packages-list/packages-list.component';
import { ProductListComponent } from './items/product-list/product-list.component';
import { LoginComponent } from './admin/login/login.component';
import { PackageUploadComponent } from './admin/package-upload/package-upload.component';
import { ProductUploadComponent } from './admin/product-upload/product-upload.component';
import { AllItemsComponent } from './admin/all-items/all-items.component';


const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'offer-upload',
        component: PackageUploadComponent,
      },
      {
        path: 'product-upload',
        component: ProductUploadComponent,
      },
      {
        path: 'all-items',
        component: AllItemsComponent,
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
