import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (response: any) => {
          sessionStorage.setItem('tk', response.token);
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          Swal.fire({
            title: 'Error de Inicio de Sesión',
            text: err.error.message || 'Ocurrió un error en el inicio de sesión',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }


}
