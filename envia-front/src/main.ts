import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Approutes } from './app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(Approutes),
    importProvidersFrom(HttpClientModule) // Asegúrate de que HttpClientModule esté importado
    ,
    provideAnimations()
]
}).catch(err => console.error(err));
