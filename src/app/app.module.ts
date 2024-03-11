import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from 'primeng/tabview';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CommonService } from './common.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ItemUploadComponent } from './admin/item-upload/item-upload.component';
import { LoginComponent } from './admin/login/login.component';
import { OrdersHistoryComponent } from './admin/orders-history/orders-history.component';
import { CheckoutComponent } from './checkoutAndPay/checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './items/cart/cart.component';
import { ItemsComponent } from './items/items/items.component';
import { AddTypeComponent } from './admin/add-type/add-type.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    ItemsComponent,
    ItemUploadComponent,
    OrdersHistoryComponent,
    AddTypeComponent,
  ],
  imports: [
    TabViewModule,
    ConfirmDialogModule,
    ImageModule,
    FileUploadModule,
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
    ButtonModule,
    DropdownModule,
    ToastModule,
    DataViewModule,
    HttpClientModule,
    MenubarModule,
    BrowserModule,
    AppRoutingModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    InputTextareaModule,
    ToggleButtonModule,
  ],
  providers: [MessageService, DialogService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
