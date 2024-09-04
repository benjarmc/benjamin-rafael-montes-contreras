import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];

  constructor(private productService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  viewDetails(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  formatPrice(price: any): string {
    return (Number(price) || 0).toFixed(2);
  }
}
