import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterLink,
    RouterOutlet,
    FontAwesomeModule
  ]
})
export class UserModule { }
