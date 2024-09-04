import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./componets/header/header.component";
import {FooterComponent} from "./componets/footer/footer.component";
import {HomeComponent} from "./componets/home/home.component";
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SweetAlert2Module.forRoot(),
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: []
})


export class AppModule {
}
