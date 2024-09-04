import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./componets/header/header.component";
import {HomeComponent} from "./componets/home/home.component";
import {FooterComponent} from "./componets/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'commerce';
}
