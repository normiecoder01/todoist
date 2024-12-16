import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { IUserList } from '../../../core/interfaces/IUserList';
import { AdminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '../../../core/enums/role';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    CardModule,
    CommonModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  
  dashName: string = '';
  managers: any[] = []; // Holds the list of managers
  selectedUserId: number | null = null; // To store the selected user ID for assignment
  showModal: boolean = false; // To control the visibility of the modal
  users: any[] = [];
  
    // Pagination variables
    Math = Math;
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalUsers: number = 0;
    totalManagers: number = 0;

  constructor( private router: Router, private adminService: AdminService){}
  
  ngOnInit(): void {
    this.checkUser();
    // this.GetAllUser();
    // this.GetAllManagers();
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
      case 'reports':
        this.router.navigate(['/admin/reports']);
        break;
      default:
        break;
    }
  }

  checkUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const loggedInUserString = localStorage.getItem('loggedUser');
      if (loggedInUserString) {
        const loggedInUser = JSON.parse(loggedInUserString);
        this.dashName = loggedInUser.firstname;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  onLogOut() {
    localStorage.removeItem('loggedUser');
  
    // Perform navigation first
    this.router.navigate(['/']).then(() => {
      // Show SweetAlert after a short delay
      setTimeout(() => {
        Swal.fire({
          title: 'Logged Out',
          text: 'logged out successfully.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
          position:"top-end",
          toast:true
        });
      }, 100); // Short delay before showing SweetAlert
    });
  }


//   GetAllUser = () => {
//     this.adminService.GetAllUser(this.currentPage, this.itemsPerPage).subscribe((response: any) => {
//       this.users = response.items; // Assuming API sends {data: [], totalCount: number}
//       this.totalUsers = response.totalPages;
//     });
//   }

//   GetAllManagers = () => {
//     this.adminService.GetAllManagers(this.currentPage, this.itemsPerPage).subscribe((response: any) => {
//       this.managers = response.items;
//       this.totalManagers = response.totalPages;
//     });
//   }

//   onPageChange(pageNumber: number) {
//     this.currentPage = pageNumber;
//     this.GetAllUser();
//   }

//   onItemsPerPageChange(event: Event) {
//     const target = event.target as HTMLSelectElement; // Explicitly cast to HTMLSelectElement
//     const value = parseInt(target.value, 10); // Get the value and convert it to a number
//     this.itemsPerPage = value;
//     this.GetAllUser(); // Refresh the list based on new items per page
//   }

//   confirmDelete(id: number) {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.deleteUser(id);
//       }
//     });
//   }
  
//   deleteUser(id: number) {
//     this.adminService.DeleteUser(id).subscribe({
//       next: (res) => {
//         Swal.fire(
//           'Deleted!',
//           'User has been deleted.',
//           'success'
//         );
//         // Refresh the list after deletion
//         this.GetAllUser();
//       },
//       error: (err) => {
//         console.error(err);
//         Swal.fire(
//           'Error!',
//           'There was a problem deleting the user.',
//           'error'
//         );
//       }
//     });
//   }

//   promoteUser(userId: number) {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to promote this user to Manager?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, promote',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.adminService.promoteToManager(userId).subscribe({
//           next: (res) => {
//             Swal.fire('Promoted!', 'The user has been promoted to Manager.', 'success');
//             // Refresh the list after promotion
//             this.GetAllUser();
//           },
//           error: (err) => {
//             console.error(err);
//             Swal.fire('Error!', 'There was an issue promoting the user.', 'error');
//           }
//         });
//       }
//     });
//   }

//   unassignManager(userId: number) {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to unassign this user’s manager?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, unassign',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.adminService.unassignManager(userId).subscribe({
//           next: (res) => {
//             Swal.fire('Unassigned!', 'The manager has been unassigned from the user.', 'success');
//             // Refresh the list after unassigning
//             this.GetAllUser();
//           },
//           error: (err) => {
//             console.error(err);
//             Swal.fire('Error!', 'There was an issue unassigning the manager.', 'error');
//           }
//         });
//       }
//     });
//   }

//   demoteManager(userId: number) {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to demote this manager to a user?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, demote',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log("Demoting manager with ID:", userId);
//         this.adminService.demoteToUser(userId).subscribe({
//           next: (res) => {
//             Swal.fire('Demoted!', 'The manager has been demoted to user.', 'success');
//             // Refresh the list after demotion
//             this.GetAllUser();
//           },
//           error: (err) => {
//             console.error(err);
//             Swal.fire('Error!', 'There was an issue demoting the manager.', 'error');
//           }
//         });
//       }
//     });
//   }

//  // Opens the modal and sets the selected user ID
//  openAssignModal(userId: number) {
//   this.selectedUserId = userId;
//   this.showModal = true;
// }

//   // Assign the selected manager to the user
//   assignManager(managerId: number) {
//     if (this.selectedUserId) {
//       this.adminService.assignManager(this.selectedUserId, managerId).subscribe({
//         next: () => {
//           Swal.fire('Assigned!', 'The manager has been assigned to the user.', 'success');
//           this.GetAllUser(); // Refresh the user list
//           this.closeModal();
//         },
//         error: (err) => {
//           console.error(err);
//           Swal.fire('Error!', 'There was an issue assigning the manager.', 'error');
//         }
//       });
//     }
//   }
  
//   // Closes the modal
//   closeModal() {
//     this.showModal = false;
//     this.selectedUserId = null;
//   }

}
