import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ShippingService} from "../../services/shipping.service";
import {Router} from "@angular/router";
import {ShippingModalComponent} from "./shipping-modal/shipping-modal.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, ShippingModalComponent],
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})

export class ShippingComponent implements OnInit {
  product: any;
  shippingForm: FormGroup;
  states: { name: string, code_3_digits: string }[] = [];
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private shippingService: ShippingService, private dialog: MatDialog) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];

    this.shippingForm = this.fb.group({
      // Origen
      originName: ['', Validators.required],
      originEmail: ['', [Validators.required, Validators.email]],
      originPhone: ['', Validators.required],
      originStreet: ['', Validators.required],
      originNumber: ['', Validators.required],
      originCity: ['', Validators.required],
      originState: ['', Validators.required],
      originPostalCode: ['', Validators.required],

      // Destino
      destinationName: ['', Validators.required],
      destinationEmail: ['', [Validators.required, Validators.email]],
      destinationPhone: ['', Validators.required],
      destinationStreet: ['', Validators.required],
      destinationNumber: ['', Validators.required],
      destinationCity: ['', Validators.required],
      destinationState: ['', Validators.required],
      destinationPostalCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Producto recibido:', this.product);
    this.shippingService.getState().subscribe({
      next: (response: any) => {
        this.states = response;
      },
      error: (error: any) => {
        console.error('Error loading states:', error);
      }
    })
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.shippingForm.valid) {
      Swal.fire({
        title: 'Enviando información...',
        text: 'Por favor espera mientras procesamos la solicitud.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const formValue = this.shippingForm.value;

      const transformedData = {
        origin: {
          name: formValue.originName,
          email: formValue.originEmail,
          phone: formValue.originPhone,
          street: formValue.originStreet,
          number: formValue.originNumber,
          city: formValue.originCity,
          state: formValue.originState,
          country: 'MX',
          postalCode: formValue.originPostalCode
        },
        destination: {
          name: formValue.destinationName,
          email: formValue.destinationEmail,
          phone: formValue.destinationPhone,
          street: formValue.destinationStreet,
          number: formValue.destinationNumber,
          city: formValue.destinationCity,
          state: formValue.destinationState,
          country: 'MX',
          postalCode: formValue.destinationPostalCode
        },
        packages: [
          {
            content: this.product.name,
            amount: 1,
            type: 'box',
            weight: this.product.weight || 1,
            insurance: 0,
            declaredValue: parseFloat(this.product.price) || 0,
            weightUnit: 'KG',
            lengthUnit: 'CM',
            dimensions: {
              length: parseFloat(this.product.length),
              width: parseFloat(this.product.width),
              height: parseFloat(this.product.height)
            }
          }
        ],
        shipment: {
          carrier: 'dhl',
          type: 0
        },
        settings: {
          currency: 'MXN'
        }
      };

      console.log('Transformed Data:', transformedData);

      this.shippingService.quoteShipping(transformedData).subscribe({
        next: (response: any) => {
          Swal.close();
          console.log(response);
          this.openShippingModal(response.data, transformedData);
        },
        error: (error: any) => {
          Swal.close(); // Cierra el SweetAlert en caso de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al procesar la solicitud.',
          }).then(() => {
            this.router.navigate(['/']); // Redirige después de cerrar el SweetAlert
          });
          console.error('Error loading states:', error);
        }
      })
    }
  }

  openShippingModal(shippingOptions: any[], quoteData: any): void {
    const dialogRef = this.dialog.open(ShippingModalComponent, {
      width: '500px',
      data: {
        shippingOptions,
        quoteData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El modal de envío se ha cerrado con el resultado:', result);
        this.router.navigate(['/label'], {state: {label: result}});
      } else {
        console.log('El modal de envío se ha cerrado sin resultado.');
        this.router.navigate(['/']);
      }
    });
  }


}
