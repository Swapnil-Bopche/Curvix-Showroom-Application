import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Core/services/auth.service';
import { log } from 'node:console';
import e from 'express';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  _authSrv = inject(AuthService)
  _router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Please fill in all fields correctly');
      return;
    }

    this.isLoading.set(true);
    const { email, password } = this.loginForm.value;

    // API call
    this._authSrv.login({ email, password }).subscribe({
      next: (res: any) => {
        console.log('full response', res);

        this.isLoading.set(false);

        const token = res.data?.token || res.token
        if (!token) {
          this.errorMessage.set('Token not recieved from servefr')
          return
        }

        // store token
        localStorage.setItem('vehicle_showroom_token', token)
        alert('login succeful, token stored');

        // navigate to dashboard
        this._router.navigate(['/dashboard'])

      },

      error: (err) => {
        this.isLoading.set(false)

        if (err.status === 401) {
          this.errorMessage.set('Invalid email or password')
        } else {
          this.errorMessage.set(err?.error?.message || "Something went wrong, Try again later")
        }
        console.error('login err', err);

      }
    })

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}




//login credentails
// email: "chetan@gmail.com" password: 2026_angular ->  Production credentails