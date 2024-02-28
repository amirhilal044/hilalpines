import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ProxyService } from '../shared/Proxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-upload',
  templateUrl: './item-upload.component.html',
  styleUrls: ['./item-upload.component.scss'],
})
export class ItemUploadComponent implements OnInit {
  itemUploadForm!: FormGroup;
  uploadedImage: any;
  itemsTypes: SelectItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private proxyService: ProxyService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initializeForm();
    // Initialize dropdown options after a short delay
    setTimeout(() => {
      this.initializeDropdownOptions();
    }, 100);
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
}
