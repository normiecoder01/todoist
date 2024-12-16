import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user-dashboard/user-dashboard.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';



const routes: Routes = [
  { path : 'dashboard', component : DashboardComponent},
  {path : 'app-feedback-form', component : FeedbackFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
