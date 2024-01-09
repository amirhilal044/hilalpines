import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CommonService } from './common.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './items/cart/cart.component';
import { CheckoutComponent } from './checkoutAndPay/checkout/checkout.component';
import { PackagesListComponent } from './items/packages-list/packages-list.component';
import { ProductListComponent } from './items/product-list/product-list.component';
import { OrderInfoComponent } from './checkoutAndPay/order-info/order-info.component';
import { LoginComponent } from './admin/login/login.component';
import { ProductUploadComponent } from './admin/product-upload/product-upload.component';
import { PackageUploadComponent } from './admin/package-upload/package-upload.component';
import { AllItemsComponent } from './admin/all-items/all-items.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    ProductListComponent,
    PackagesListComponent,
    CartComponent,
    CheckoutComponent,
    OrderInfoComponent,
    LoginComponent,
    ProductUploadComponent,
    PackageUploadComponent,
    AllItemsComponent,
  ],
  imports: [
    CardModule,
    InputNumberModule,
    GalleriaModule,
    DialogModule,
    BrowserAnimationsModule,
    BadgeModule,
    DynamicDialogModule,
    MessageModule,
    MessagesModule,
    DataViewModule,
    ReactiveFormsModule,
    InputTextModule,
    CarouselModule,
    RippleModule,
    RatingModule,
    ButtonModule,
    DropdownModule,
    ToastModule,
    DataViewModule,
    HttpClientModule,
    MenubarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
