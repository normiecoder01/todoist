import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { ReportService } from '../../../core/services/report.service';
import { IUserList } from '../../../core/interfaces/IUserList';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users: IUserList[] = [];
  paginatedUsers: IUserList[] = [];
  userReports: any[] = [];

  searchTerm: string = '';
  pageSize: number = 7;
  totalRecords: number = 0;
  currentPage: number = 0;

  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadUsers();
    this.loadUserReports();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        this.totalRecords = this.users.length;
        this.paginateUsers();
      },
      (error) => console.error(error)
    );
  }

  paginateUsers() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.users.slice(start, end);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.paginateUsers();
  }

  loadUserReports(): void {
    this.reportService.getUserReports().subscribe(
      (response) => (this.userReports = response),
      (error) => console.error(error)
    );
  }
  onSearch(): void {
    if (this.searchTerm) {
      this.paginatedUsers = this.users.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.paginateUsers();
    }
  }

  // onEditUser(user: any): void {
  //   // Logic to edit user
  //   console.log('Edit user:', user);
  // }  //need to develop api for this

  // onDeleteUser(userId: number): void {
  //   this.userService.deleteUser(userId).subscribe(
  //     () => {
  //       this.users = this.users.filter(user => user.id !== userId);
  //       console.log('User deleted');
  //     },
  //     (error) => console.error(error)
  //   );
  // } //need to develop api for this

  onViewReport(user: any): void {
    console.log('Viewing report for:', user);
    // Add logic to navigate to the report page for the user
  }

  // onDownloadReport(report: any): void {
  //   this.reportService.downloadReport(report.id).subscribe(
  //     (response) => {
  //       console.log('Report downloaded');
  //     },
  //     (error) => console.error(error)
  //   );
  // }

  onShareReport(report: any): void {
    console.log('Sharing report:', report);
    // Add logic to share the report
  }

  // Navigation methods for the sidebar
  navigateTo(page: string): void {
    switch (page) {
      case 'dashboard':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'user-management':
        this.router.navigate(['/admin/user-management']);
        break;
      case 'task-management':
        this.router.navigate(['/admin/task-management']);
        break;
        case 'user-task-management':
          this.router.navigate(['/admin/user-task-management']);
          break;
      case 'reports':
        this.router.navigate(['/admin/reports']);
        break;
      default:
        break;
    }
  }
}
