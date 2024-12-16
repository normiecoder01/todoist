import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {  UserService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';
import { Role } from '../../../core/enums/role';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { ILoggedUser } from '../../../core/interfaces/ILoggedUser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FooterComponent,RouterLink, ReactiveFormsModule, CommonModule,HeaderComponent],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup= <FormGroup>{};

  constructor(private fb: FormBuilder, private router: Router, private authService: UserService) {
  }
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]*$') // Alphanumeric validation
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$') // Password validation
      ]]
    });
  }
  onSubmit()
  {
    if (this.loginForm.valid) {
      this.authService.Login(this.loginForm.value).subscribe(
        {
          next :(success :ILoggedUser) =>{
            if(typeof window !== "undefined" && window.localStorage){
     
              localStorage.setItem('loggedUser', JSON.stringify(success));
            }
            this.navigateUser(success);
          }, error(){
            Swal.fire({
              title: 'Login Failed',
              text: 'Invalid username or password. Please try again.',
              icon: 'error',
             showConfirmButton:false,
              timer: 1500,
              toast:true,
              position:"top-end",
            
            });
          }
        }
      )
    }else{
      this.loginForm.markAllAsTouched();
    } 

  }
  navigateUser(user : ILoggedUser){
    // Show SweetAlert first
    Swal.fire({
      title: 'Login Successful!',
      text: `Welcome ${user.firstName}!`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position:"top-end",
      toast:true

    })
    // Perform navigation after SweetAlert is closed
    if (user.role === Role.User) {
      this.router.navigate(['/user/dashboard']);
    } else if (user.role === Role.Manager) {
      this.router.navigate(['/manager/dashboard']);
    } else {
      this.router.navigate(['/admin/dashboard']);
    }
}
    onReset(): void {
      this.loginForm.reset();
    }
}

