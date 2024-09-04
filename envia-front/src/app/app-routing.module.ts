import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./componets/auth/login/login.component";
import {SignupComponent} from "./componets/auth/signup/signup.component";
import {HomeComponent} from "./componets/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProductDetailComponent} from "./componets/product-detail/product-detail.component";
import {ShippingComponent} from "./componets/shipping/shipping.component";
import {ShippingLabelComponent} from "./componets/shipping/shipping-label/shipping-label.component";

export const Approutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'shipping',
    component: ShippingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'label',
    component: ShippingLabelComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
