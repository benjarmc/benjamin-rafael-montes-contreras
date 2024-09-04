import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service'; // Asegúrate de crear este servicio

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getById(id).subscribe(data => {
      this.product = data;
    });
  }

  formatPrice(price: any): string {
    return (Number(price) || 0).toFixed(2);
  }

  openShippingForm(): void {
    this.router.navigate(['/shipping'], {state: {product: this.product}});
  }
}

