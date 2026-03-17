import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  _authSrv = inject(AuthService)
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  passwordStrength = signal<'weak' | 'fair' | 'good' | 'strong'>('weak');
  fb = inject(FormBuilder)
_router = inject(Router)

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage.set('Please fill in all fields correctly');
      return;
    }

    this.isLoading.set(true);
    const {name, email, password } = this.registerForm.value;

    // API call
    this._authSrv.register({name, email, password }).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);

        // const token = res.data?.token || res.token
        // if (!token) {
        //   this.errorMessage.set('Token not recieved from servefr')
        // }

        // // store token
        // localStorage.setItem('vehicle_showroom_token', token)
        // alert('login succeful, token stored');

        // navigate to dashboard
        this._router.navigate(['/login'])

      },

      error: (err) => {
        this.isLoading.set(false)

        if (err.status === 401) {
          this.errorMessage.set('Invalid email or password')
        } else {
          this.errorMessage.set("Something went wrong, Try again later")
        }
        console.error('login err', err);

      }
    })

  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

}