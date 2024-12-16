import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';
import { Role } from '../../../core/enums/role';
import { HeaderComponent } from '../../../core/components/header/header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,RouterLink,ReactiveFormsModule,CommonModule,HeaderComponent],
  providers: [UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup = <FormGroup>{};
  constructor(private fb: FormBuilder,private authService: UserService, private router : Router) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname      : ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname       : ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email          : ['', [Validators.required, Validators.email]],
      mobileno       : ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username       : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password       : ['', [Validators.required, passwordValidator]],
      confirmpassword: ['', [Validators.required]],
      isAgreed       : [false, Validators.requiredTrue],
    },{validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmpassword')?.value;
    if (password !== confirmPassword) {

      return { 'mismatch': true };
    }
    return null;
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { confirmpassword, ...formData } = this.signupForm.value;
      console.log(formData);
      
      this.authService.Register(formData).subscribe({
        next: (success: any) => {
       
          if (success) {
            Swal.fire({
              title: 'Registration Successful',
              text: 'You have successfully registered.',
              icon: 'success',
              showConfirmButton:false,
              timer: 2000,
              position: 'top-end',
              toast: true

            }).then(() => {
              this.router.navigate(['/login']);
            });
          } else {
            Swal.fire({
              title: 'Registration Failed',
              text: 'There was an error during registration. Please try again.',
              icon: 'error',
              showConfirmButton:false,
              timer: 2000,
              position: 'top-end',
              toast: true
            });
          }
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Registration Failed',
            text: 'Username already exists. Please choose a different username.',
            icon: 'info',
            showConfirmButton:false,
            timer: 2000,
            position: 'top-end',
            toast: true
          });
        }
      });
    }
  }    
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  
  if (!value) {
    return null;
  }
  
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[@$!%*?&]/.test(value);
  const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  if (!valid) {
    return {
      passwordStrength: true
    };
  }

  return null;
}