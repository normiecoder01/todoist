import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {  RouterLink, RouterOutlet } from '@angular/router';

import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { WelcomeComponent } from '../../welcome/welcome.component';



import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterLink,
    RouterOutlet,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    WelcomeComponent,
    DataGridComponent
  ]
})
export class AdminModule { }
