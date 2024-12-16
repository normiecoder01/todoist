import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface TaskReport {
  userId: number;
  userName: string;
  pendingTaskCount: number;
  completedTaskCount: number;
  overdueTaskCount: number;
  highPriorityTaskCount: number;
  mediumPriorityTaskCount: number;
  lowPriorityTaskCount: number;
}


@Component({
  selector: 'app-admin-task-report',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './admin-task-report.component.html',
  styleUrl: './admin-task-report.component.css'
})
export class AdminTaskReportComponent implements OnInit {
  

  displayedColumns: string[] = [
    'userId', 
    'userName', 
    'pendingTasks', 
    'completedTasks', 
    'overdueTasks', 
    'highPriorityTasks', 
    'mediumPriorityTasks', 
    'lowPriorityTasks'
  ];

  dataSource = new MatTableDataSource<TaskReport>();

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchTaskReport();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;  // Assign the paginator correctly
  }


  fetchTaskReport() {
    this.http.get<TaskReport[]>('https://localhost:7293/api/Task/user-task-report')
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

}
