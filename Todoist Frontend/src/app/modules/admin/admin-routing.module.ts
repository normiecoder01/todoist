import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { ReportsComponent } from './reports/reports.component';
import { UserTaskManagementComponent } from './user-task-management/user-task-management.component';
import { AdminTaskReportComponent } from './admin-task-report/admin-task-report.component';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'task-management', component: TaskManagementComponent },
  { path: 'user-task-management', component: UserTaskManagementComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'admin-task-report', component: AdminTaskReportComponent},
  {path : 'data-grid', component: DataGridComponent},
  {path : 'welcome', component:WelcomeComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
