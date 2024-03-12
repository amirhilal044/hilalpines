import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { ProxyService } from '../shared/Proxy.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
})
export class AddTypeComponent {
  typeForm!: FormGroup;

  constructor(
    private proxyService: ProxyService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.typeForm = this.formBuilder.group({
      type: ['', Validators.required],
    });
  }
  addType() {
    if (this.typeForm.invalid) {
      alert('Please fill out all the fields in the form.');
      return;
    }

    const newType = this.typeForm.value;
    this.proxyService
      .addType(newType)
      .pipe(
        tap(() => {
          this.router.navigate(['home-page']);
        }),
        catchError((error) => {
          console.error('Upload failed:', error);
          alert('Upload failed');
          return of(null);
        })
      )
      .subscribe();
  }

  // deleteType() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to delete type?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.proxyService
  //         .deleteType()
  //         .pipe(
  //           tap(() => {
  //             window.location.reload()
  //             this.router.navigate(['admin/types'])
  //           }),
  //           catchError((error) => {
  //             console.error('Error deleting type:', error);
  //             // Handle error, show message to the user, etc.
  //             alert('Error deleting type. Please try again later.');
  //             return of(null); // Return observable to avoid breaking the chain
  //           })
  //         )
  //         .subscribe();
  //     },
  //     reject: () => { },
  //   });
  // }
}
