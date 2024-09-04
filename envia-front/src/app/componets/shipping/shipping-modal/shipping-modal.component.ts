import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import Swal from "sweetalert2";
import {ShippingService} from "../../../services/shipping.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shipping-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './shipping-modal.component.html',
  styleUrls: ['./shipping-modal.component.css']
})
export class ShippingModalComponent {
  shippingOptions: any[];
  quoteData: any;

  constructor(
    public dialogRef: MatDialogRef<ShippingModalComponent>,
    private shippingService: ShippingService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { shippingOptions: any[], quoteData: any }
  ) {
    this.shippingOptions = data.shippingOptions;
    this.quoteData = data.quoteData;
  }

  generateShipment(option: any): void {
    Swal.fire({
      title: 'Enviando información...',
      text: 'Por favor espera mientras procesamos la solicitud.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.quoteData.shipment = {
      ...this.quoteData.shipment,
      service: option.service
    };

    this.quoteData.settings = {
      printFormat: 'PDF',
      printSize: 'STOCK_4X6',
      comments: 'comentarios de el envío'
    };
    console.log('Datos actualizados:', this.data);
    this.shippingService.createLabel(this.quoteData).subscribe({
      next: (response: any) => {
        Swal.close();
        console.log(response);
        this.dialogRef.close(response.data[0]);
      },
      error: (error: any) => {
        console.error('Error loading states:', error);
        Swal.close(); // Cierra el SweetAlert en caso de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al procesar la solicitud.',
        }).then(() => {
          this.dialogRef.close();
        });

      }
    });


  }

}
