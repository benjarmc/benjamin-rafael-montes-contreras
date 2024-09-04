import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('tk');
  }

  logout(): void {
    sessionStorage.removeItem('tk');
    this.router.navigate(['/login']);
  }
}
