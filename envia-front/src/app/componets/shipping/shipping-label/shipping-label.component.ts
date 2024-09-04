import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shipping-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-label.component.html',
  styleUrls: ['./shipping-label.component.css']
})
export class ShippingLabelComponent {
  protected data: any;

  constructor(
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras?.state?.['label'];
    console.log('Datos recibidos:', this.data);
  }

  goBackToProducts(): void {
    this.router.navigate(['/']);
  }

}
