import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { ItemsDto } from 'src/app/items/shared/items.dto';
import { ProxyService } from '../shared/Proxy.service';

@Component({
  selector: 'app-item-upload',
  templateUrl: './item-upload.component.html',
  styleUrls: ['./item-upload.component.scss'],
})
export class ItemUploadComponent implements OnInit {
  items: ItemsDto[];
  itemUploadForm!: FormGroup;
  uploadedImage: any;
  itemsTypes: SelectItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private proxyService: ProxyService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.initializeForm();
    // Initialize dropdown options after a short delay
    setTimeout(() => {
      this.initializeDropdownOptions();
    }, 100);

    this.proxyService.getAllItems().subscribe((items) => {
      this.items = items;
    });
  }

  private initializeForm() {
    this.itemUploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  private initializeDropdownOptions() {
    this.itemsTypes = [
      { label: 'Product', value: 'product' },
      { label: 'Offer', value: 'offer' },
    ];
  }
  onSelectPicture(event: any) {
    if (event.files.length > 0) {
      const file: File = event.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.itemUploadForm.patchValue({
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  submitItem() {
    const newItem = this.itemUploadForm.value;
    this.proxyService.createItem(newItem).subscribe(
      () => {
        this.router.navigate(['home-page']);
      },
      (error) => {
        console.error('Upload failed:', error);
        alert('Upload failed');
      }
    );
  }

  deleteItem(item: ItemsDto) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proxyService
          .deleteItem(item.id)
          .pipe(
            tap(() => {
              window.location.reload()
              this.router.navigate(['admin/item-upload'])
            }),
            catchError((error) => {
              console.error('Error deleting item:', error);
              // Handle error, show message to the user, etc.
              alert('Error deleting item. Please try again later.');
              return of(null); // Return observable to avoid breaking the chain
            })
          )
          .subscribe();
      },
      reject: () => {},
    });
  }

  logout() {
    sessionStorage.removeItem('currentUser')
    this.router.navigate(['admin/login'])
  }
}
