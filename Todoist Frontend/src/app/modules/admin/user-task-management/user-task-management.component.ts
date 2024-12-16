import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskPriority } from '../../../core/enums/task.enums';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import Swal from 'sweetalert2';
import { TaskService } from '../../../core/services/task.service';
import { BucketService } from '../../../core/services/bucket.service'; // Adjust path based on your folder structure
import { IBucket, IBucketCreate } from '../../../core/interfaces/IBucket';
import { MessageService } from 'primeng/api'; // PrimeNG for toast messages
import {
  getCompletedTasks,
  getIncompleteTasks,
  Task,
  UpdateTaskCompletionDTO,
  UpdateTaskPercentageDTO,
} from '../../../core/interfaces/task.model';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-user-task-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    DropdownModule,
    TableModule,
    DialogModule,
    CalendarModule,
    InputTextModule,
    InputTextModule,
    SliderModule,
    TooltipModule,
    CardModule,
    ProgressBarModule,
  ],
  templateUrl: './user-task-management.component.html',
  styleUrl: './user-task-management.component.css',
  providers: [MessageService],
})
export class UserTaskManagementComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private basketservice: BucketService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}
  selectedDueDate: Date | null = null; // Store the selected due date for filtering

  userOptions: any[] = []; // To store user options for the dropdown
  displayModal = false;

  displayTaskInfo: boolean = false;
  selectedTask!: getCompletedTasks;
  completedTasks: getCompletedTasks[] = []; // Declare the completedTasks array
  today: Date = new Date();
  datetime24h: Date | undefined;
  tasks: getIncompleteTasks[] = []; // Main tasks array
  filteredTasks: getIncompleteTasks[] = []; // Filtered tasks for display
  showCompletedTask: boolean = false; // Toggle state (false = pending, true = completed)
  taskForm!: FormGroup; // Form for adding/editing tasks
  taskPriorities = Object.values(TaskPriority); // Enum values for TaskPriority dropdown
  taskStatuses = [
    { label: 'Pending', value: false },
    { label: 'Completed', value: true },
  ]; // Boolean values for task status (false for Pending, true for Completed)

  selectedStatus: string = ''; // Filter selection
  selectedPriority: TaskPriority | '' = ''; // Filter selection
  searchTerm: string = ''; // Search term for task name or description

  displayTaskDetails: boolean = false; // Show/hide task details modal
  editMode: boolean = false; // Determines if we're editing or adding a task
  displayCompletedTasksModal: boolean = false; // Modal state for completed tasks
  displayTaskInfoModal: boolean = false; // Modal state for task info

  repeatOptions = [
    { label: 'None', value: 'None' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekdays', value: 'weekdays' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  buckets: IBucket[] = [];
  bucketOptions: any[] = []; // For dropdown display
  selectedBucket: IBucket | null = null; // Model for the selected bucket
  newBucketName: string = '';
  displayBucketModal: boolean = false; // For managing bucket modals
  editingBucketId: number | null = null; // Tracks which bucket is being edited
  editedBucketName: string = '';

  ngOnInit(): void {
    // Fetch tasks from the API on initialization
    this.initializeForm();
    this.loadTasks();
    this.loadBucketsByUser();
    this.loadUsers();
  }

  // Method to load users for the dropdown
  loadUsers() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.userOptions = response.map((user: any) => ({
          label: `${user.firstName} ${user.lastName} (${user.userName})`,
          value: user.userId,
        }));

        // Add the admin to the list of users
      this.userOptions.push({
        label: `${loggedUser.firstName} ${loggedUser.lastName} (${loggedUser.userName})`,
        value: loggedUser.userId,
      });
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load users',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      }
    );
  }

  // Initialize the form with bucketId
  initializeForm(): void {
    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      assignedTo: ['', Validators.required], // Assigned to dropdown for users
      taskPriority: ['', Validators.required],
      bucketId: [null, Validators.required], // Will hold the bucketId
      dueDate: [null, Validators.required],
      repeatFrequency: ['None'],
    });
  }
  // Method to toggle between showing completed and pending tasks
  toggleTaskView() {
    this.showCompletedTask = !this.showCompletedTask; // Toggle the state
    this.showCompletedTasks(); // Filter tasks based on the toggle state
  }
  // Fetch tasks from the API
  loadTasks(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userlogin = loggedUser.userId;
    if (userlogin) {
      this.taskService.getIncompleteTasks(userlogin).subscribe(
        (tasks: getIncompleteTasks[]) => {
          if (tasks.length != 0) {
            this.tasks = tasks;

            this.filteredTasks = [...this.tasks]; // Initialize filteredTasks after loading data
          }
        },
        (error) => {
          console.error('Failed to load tasks', error);
        }
      );
    } else {
      console.error('User ID not found');
    }
  }

  filterTasks(): void {
    // Make sure we have tasks to filter
    if (!this.tasks || this.tasks.length === 0) {
      this.filteredTasks = [];
      return;
    }

    // Filter the tasks
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearch =
        this.searchTerm && this.searchTerm.trim() !== ''
          ? task.taskTitle
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            task.taskDescription
              ?.toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          : true;

      const matchesStatus =
        this.selectedStatus !== ''
          ? (task.percentageComplete === 100) ===
            (this.selectedStatus === 'true')
          : true;

      const matchesPriority = this.selectedPriority
        ? task.taskPriority === this.selectedPriority
        : true;

      const matchesBucket = this.selectedBucket
        ? task.bucketId === this.selectedBucket.bucketId // Use bucketName for comparison
        : true;
      console.log(matchesBucket, this.selectedBucket);

      const matchesDueDate = this.selectedDueDate
      
        ? new Date(task.dueDate).toDateString() ===
          this.selectedDueDate.toDateString() // Compare task's due date with the selected date
        : true;

        console.log(this.selectedDueDate);

      return matchesSearch && matchesPriority && matchesBucket&& matchesDueDate;
    });
  }

  // Mark task as completed
  markTaskAsCompleted(taskId: number): void {
    const completionDTO: UpdateTaskCompletionDTO = { isComplete: true };
    this.taskService.updateTaskCompletion(taskId, completionDTO).subscribe(
      (updatedTask) => {
        console.log('Task marked as completed:', updatedTask);
        this.loadTasks(); // Refresh the task list after marking as completed
      },
      (error) => {
        console.error('Error marking task as completed:', error);
      }
    );
  }
  // Mark task as pending
  markTaskAsPending(taskId: number): void {
    const completionDTO: UpdateTaskCompletionDTO = { isComplete: false };
    this.taskService.updateTaskCompletion(taskId, completionDTO).subscribe(
      (updatedTask) => {
        this.loadTasks(); // Refresh the task list after marking as pending
      },
      (error) => {
        console.error('Error marking task as pending:', error);
      }
    );
  }
  // Method to load and show completed tasks
  showCompletedTasks() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userlogin = loggedUser.userId;
    this.taskService.getCompletedTasks(userlogin).subscribe(
      (tasks: getCompletedTasks[]) => {
        this.completedTasks = tasks;
        this.displayCompletedTasksModal = true; // Open modal
      },
      (error) => {
        console.error('Error loading completed tasks', error);
      }
    );
  }
  // Show task info in a separate modal
  showTaskInfoimp(task: getIncompleteTasks) {
    this.selectedTask = task;
    console.log(this.selectedTask);
    this.displayTaskInfoModal = true; // Open task info modal
  }
  // Update task progress
  updateProgress(taskId: number, percentage: number): void {
    const progressDTO: UpdateTaskPercentageDTO = {
      percentageComplete: percentage,
    };
    this.taskService.updateTaskPercentage(taskId, progressDTO).subscribe(
      (updatedTask) => {
        // console.log('Task progress updated:', updatedTask);
        this.loadTasks(); // Reload tasks after updating progress
      },
      (error) => {
        console.error('Error updating task progress:', error);
      }
    );
  }
  // Clear filters to display all tasks again
  clearFilters(): void {
    this.selectedStatus = '';
    this.selectedPriority = '';
    this.selectedBucket = null;
    this.searchTerm = '';
    this.selectedDueDate = null; // Reset the selected due date
    this.filterTasks(); // Reset the filtered list
  }
  // Open the modal for adding a new task
  addTask(): void {
    this.displayModal = true;
    this.editMode = false;
    this.taskForm.reset(); // Reset the form
    this.taskForm.get('status')?.setValue(false); // Default status to 'Pending' (false)
  }
  saveTask(): void {
    if (this.taskForm.valid) {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
      const taskData = {
        ...this.taskForm.value,
        createdBy: loggedUser.userId,
      };

      if (this.editMode) {
        // Edit mode: Update the task
        this.taskService
          .updateTask(this.selectedTask.todoTaskId, taskData)
          .subscribe(() => {
            this.loadTasks(); // Refresh tasks after updating
            this.displayModal = false;
            Swal.fire({
              title: 'Updated!',
              text: 'Task has been updated successfully.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              position: 'top-end',
              toast: true,
            });
            this.editMode = false; // Reset edit mode
          });
      } else {
        // Create new task
        this.taskService.createTask(taskData).subscribe(() => {
          this.loadTasks(); // Refresh tasks after creation
          this.displayModal = false;
          Swal.fire({
            title: 'Added!',
            text: 'Task has been added successfully.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            position: 'top-end',
            toast: true,
          });
        });
      }
    }
  }
  // Edit a task
  // Add this method to handle editing a task
  editTask(taskId: number): void {
    this.taskService
      .getTaskDetails(taskId)
      .subscribe((task: getIncompleteTasks) => {
        // Patch the form with the task details
        this.taskForm.patchValue({
          taskTitle: task.taskTitle,
          taskDescription: task.taskDescription,
          assignedTo: task.assignedTo,
          taskPriority: task.taskPriority,
          bucketId: task.bucketId,
          dueDate: new Date(task.dueDate),
          repeatFrequency: task.repeatFrequency,
        });

        this.selectedTask = task; // Store the selected task
        this.editMode = true; // Set the mode to edit
        this.displayModal = true; // Open the modal
      });
  }
  // Delete a task// Delete a task
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        // Remove the deleted task from the completedTasks array
        this.completedTasks = this.completedTasks.filter(
          (task) => task.todoTaskId !== taskId
        );

        // Reload tasks and buckets if needed
        this.loadTasks();
        this.loadBucketsByUser();

        // Optionally, reset the form after task deletion
        this.taskForm.reset(); // Resets the form to its initial state

        // Show success message after deletion
        Swal.fire({
          title: 'Deleted!',
          text: 'Task has been deleted successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-right',
          toast: true,
        });
      },
      (error) => {
        // console.error('Error deleting task:', error);
        Swal.fire({
          title: 'Deleted!',
          text: 'Task has been deleted successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-right',
          toast: true,
        });
        this.loadTasks();
        this.loadBucketsByUser();
      }
    );
  }

  deleteTask1(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        // Remove the deleted task from the completedTasks array
        this.completedTasks = this.completedTasks.filter(
          (task) => task.todoTaskId !== taskId
        );

        // Reload tasks and buckets if needed
        this.loadTasks();
        this.loadBucketsByUser();

        // Optionally, reset the form after task deletion
        this.taskForm.reset(); // Resets the form to its initial state

        // Show success message after deletion
        Swal.fire({
          title: 'Deleted!',
          text: 'Task has been deleted successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-right',
          toast: true,
        });
      },
      (error) => {
        // console.error('Error deleting task:', error);
        Swal.fire({
          title: 'Deleted!',
          text: 'Task has been deleted successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-right',
          toast: true,
        });
        this.loadTasks();
        this.loadBucketsByUser();
        this.showCompletedTasks();
      }
    );
  }

  // File Selection func
  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the selected file
    if (file) {
      console.log('Selected file:', file);
      // You can now handle the file, upload it to a server, or attach it to the task.
    }
  }

  // View task details
  viewTaskDetails(taskId: number): void {
    this.taskService.getTaskDetails(taskId).subscribe((task) => {
      this.selectedTask = task;
      this.displayTaskDetails = true; // Open the Task Details modal
    });
  }

  // Trigger edit mode for the selected bucket
  onEditClick(bucket: any) {
    this.editingBucketId = bucket.bucketId;
    this.editedBucketName = bucket.bucketName; // Set the initial value to the current bucket name
  }

  // Save the edited bucket
  saveBucket(bucketId: number) {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    // Prepare the updated bucket payload for the backend
    const updatedBucket = {
      bucketName: this.editedBucketName, // Use the edited name
      createdBy: loggedUser.userId,
    };

    // Call the API to update the bucket in the backend
    this.basketservice.updateBucket(bucketId, updatedBucket).subscribe(
      (bucket) => {
        // On success, show a success message
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bucket updated successfully',
        });

        // Reload the bucket list after successful update
        this.loadBucketsByUser();

        // Exit edit mode
        this.editingBucketId = null;
        this.editedBucketName = ''; // Clear the input field
      },
      (error) => {
        // Handle error and show an error message
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update bucket',
        });
      }
    );
  }

  // Cancel edit mode without saving changes
  cancelEdit() {
    this.editingBucketId = null; // Exit edit mode without saving
    this.editedBucketName = ''; // Reset the input field
  }

  // Load all buckets by the user ID from the backend
  loadBucketsByUser(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userId = loggedUser.userId;

    if (userId) {
      this.basketservice.getBucketsByUser(userId).subscribe(
        (buckets) => {
          this.buckets = buckets;

          this.bucketOptions = this.buckets.map((bucket) => ({
            label: bucket.bucketName, // What the user sees
            value: bucket.bucketId, // What gets stored in the form
          }));
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load buckets',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User ID not found in local storage',
      });
    }
  }

  // Add a new bucket
  addBucket(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const createdBy = loggedUser.userId;
    if (!createdBy) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User not found',
      });
      return;
    }
    const newBucket: IBucketCreate = {
      bucketName: this.newBucketName,
      createdBy,
    };

    this.basketservice.addBucket(newBucket).subscribe(
      (bucket) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bucket added successfully',
        });
        this.loadBucketsByUser(); // Reload buckets after addition
        this.newBucketName = ''; // Reset input field
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add bucket',
        });
      }
    );
  }

  // Edit an existing bucket
  editBucket(bucketId: number): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    const updatedBucket = {
      bucketName: this.newBucketName,
      createdBy: loggedUser.userId,
    };

    this.basketservice.updateBucket(bucketId, updatedBucket).subscribe(
      (bucket) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bucket updated successfully',
        });
        this.loadBucketsByUser(); // Reload buckets after update
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update bucket',
        });
      }
    );
  }

  // Delete an existing bucket
  deleteBucket(bucketId: number): void {
    this.basketservice.deleteBucket(bucketId).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Bucket deleted successfully',
        });
        this.loadBucketsByUser(); // Reload buckets after deletion
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete bucket',
        });
      }
    );
  }

  // Get a bucket by ID
  viewBucketDetails(bucketId: number): void {
    this.basketservice.getBucketById(bucketId).subscribe(
      (bucket) => {
        console.log('Bucket details:', bucket);
        // Handle displaying the bucket details in the UI if needed
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch bucket details',
        });
      }
    );
  }

  // Open modal for managing buckets
  openManageBucketsModal(): void {
    this.displayBucketModal = true;
  }

  // Clear bucket selection and reset filters
  clearBucketSelection(): void {
    this.selectedBucket = null;
  }
  // Method to open the task info modal
  showTaskInfo(task: any) {
    this.selectedTask = task;
    this.displayTaskInfo = true;
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
