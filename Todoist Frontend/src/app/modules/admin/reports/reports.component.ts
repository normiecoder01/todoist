import { Component } from '@angular/core';
import { FooterComponent } from "../../../core/components/footer/footer.component";
import { HeaderComponent } from "../../../core/components/header/header.component";
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DateConversionService } from '../../../core/services/date.conversion.service';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,CommonModule,CalendarModule,FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  constructor(private router: Router, private adminService: AdminService, private http: HttpClient, private dateconversion: DateConversionService) { }

  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  dateFromCompleted: Date | null = null;
  dateToCompleted: Date | null = null;

// Convert the four dates
 dateFromString = this.dateconversion.convertDateToString(this.dateFrom)  // Converts dteFrom
 dateToString = this.dateconversion.convertDateToString(this.dateTo);      // Converts dateTo
 dateFromCompletedString = this.dateconversion.convertDateToString(this.dateFromCompleted);  // Converts dateFromCompleted
 dateToCompletedString = this.dateconversion.convertDateToString(this.dateToCompleted);      // Converts dateToCompleted

// formattedDateFrom: string | null = this.dateconversion.formatDateToDateOnly(this.dateFrom);
// formattedDateTo = this.dateconversion.formatDateToDateOnly(this.dateTo);
// formattedDateFromCompleted = this.dateconversion.formatDateToDateOnly(this.dateFromCompleted);
// formattedDateToCompleted = this.dateconversion.formatDateToDateOnly(this.dateToCompleted);

  // Utility to trigger file download
  triggerFileDownload(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url); // Clean up the URL object
  }

  // Show success alert
  showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }

  // Show error alert
  showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }

  // Download Overdue Tasks Report
  downloadOverdueTasks() {
    this.http.get('https://localhost:7293/api/Report/overdue-tasks/excel', { responseType: 'blob' })
      .subscribe((data) => {
        this.triggerFileDownload(data, 'overdue-tasks-report.xlsx');
        this.showSuccess('Overdue Tasks Report downloaded successfully');
      }, (error) => this.showError('Failed to download report'));
  }

  // Download Daily Task Count Report
  downloadDailyTaskCount() {
    this.dateFromString = this.dateconversion.convertDateToString(this.dateFrom)  // Converts dteFrom
 this.dateToString = this.dateconversion.convertDateToString(this.dateTo);      // Converts dateTo
    console.log(this.dateFromString);
    if (this.dateFromString && this.dateToString) {
      const url = `https://localhost:7293/api/Report/daily-task-count/excel?dateFrom=${this.dateFromString}&dateTo=${this.dateToString}`;
      console.log(this.dateFromString);
      this.http.get(url, { responseType: 'blob' })
        .subscribe((data) => {
          this.triggerFileDownload(data, 'daily-task-count-report.xlsx');
          this.showSuccess('Daily Task Count Report downloaded successfully');
        }, (error) => this.showError('Failed to download report'));
    } else {
      this.showError('Please select a valid date range');
    }
  }

  // Download Completed Tasks Report
  downloadCompletedTasks() {
    this.dateFromCompletedString = this.dateconversion.convertDateToString(this.dateFromCompleted);  // Converts dateFromCompleted
 this.dateToCompletedString = this.dateconversion.convertDateToString(this.dateToCompleted);      // Converts dateToCompleted

    if (this.dateFromCompletedString && this.dateToCompletedString) {
      const url = `https://localhost:7293/api/Report/completed-tasks/excel?dateFrom=${this.dateFromCompletedString}&dateTo=${this.dateToCompletedString}`;
      this.http.get(url, { responseType: 'blob' })
        .subscribe((data) => {
          this.triggerFileDownload(data, 'completed-tasks-report.xlsx');
          this.showSuccess('Completed Tasks Report downloaded successfully');
        }, (error) => this.showError('Failed to download report'));
    } else {
      this.showError('Please select a valid date range');
    }
  }

  // Download No Due Date Tasks Report
  downloadNoDueDateTasks() {
    this.http.get('https://localhost:7293/api/Report/no-due-date-tasks/excel', { responseType: 'blob' })
      .subscribe((data) => {
        this.triggerFileDownload(data, 'no-due-date-tasks-report.xlsx');
        this.showSuccess('No Due Date Tasks Report downloaded successfully');
      }, (error) => this.showError('Failed to download report'));
  }

  // Download Tasks Closed After Noon Report
  downloadTasksClosedAfterNoon() {
    this.http.get('https://localhost:7293/api/Report/tasks-closed-after-noon/excel', { responseType: 'blob' })
      .subscribe((data) => {
        this.triggerFileDownload(data, 'tasks-closed-after-noon-report.xlsx');
        this.showSuccess('Tasks Closed After Noon Report downloaded successfully');
      }, (error) => this.showError('Failed to download report'));
  }

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
