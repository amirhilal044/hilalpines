import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CartService } from 'src/app/items/shared/cart.service';
import { OrdersService } from './../../items/shared/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private cartService: CartService,
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private ordersService: OrdersService
  ) {}
  itemsOrdered: any[] = [];
  orderInfo: FormGroup;
  invoiceNumber: number;

  ngOnInit(): void {
    this.itemsOrdered = this.cartService.getAllItems();
    if (!this.itemsOrdered || this.itemsOrdered.length === 0) {
      this.router.navigate(['/cart']);
    }
    this.createForm();
    // Check if the invoice number exists in localStorage
    const storedInvoiceNumber = localStorage.getItem('invoiceNumber');

    storedInvoiceNumber
      ? (this.invoiceNumber = parseInt(storedInvoiceNumber, 10))
      : this.generateInvoiceNumber();
  }

  generateInvoiceNumber(): void {
    this.invoiceNumber = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('invoiceNumber', this.invoiceNumber.toString());
  }

  getAllItems() {
    return this.itemsOrdered;
  }

  getSmallTotalPrice(item: any) {
    return parseFloat((item.price * item.quantity).toFixed(2));
  }

  getTotalPrice() {
    const totalPrice = this.itemsOrdered.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return totalPrice.toFixed(2);
  }
  backToCart(): void {
    this.router.navigate(['/cart']);
  }

  createForm() {
    this.orderInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]], // Removed extra parameter
    });
  }

  submitOrder(): void {
    if (this.orderInfo.invalid) {
      alert('Please fill out all the fields in the order information form.');
      return;
    }
    this.confirmationService.confirm({
      message: 'Confirm Order',
      header: 'Confirmation',
      icon: 'pi pi-check',
      accept: () => {
        const order = {
          items: this.itemsOrdered.map((item) => ({
            ...item,
            smallTotalPrice: this.getSmallTotalPrice(item),
          })),
          grandTotal: this.getTotalPrice(),
          orderInfo: this.orderInfo.value,
          date: new Date().toISOString(),
        };
        localStorage.removeItem('invoiceNumber');

        this.ordersService.placeOrder(order);
      },
      reject: () => {},
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    localStorage.removeItem('invoiceNumber');
  }
}
