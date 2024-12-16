import { CommonModule, ViewportScroller } from '@angular/common';
import {Component, DoCheck, OnInit } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, RouterLinkActive,ButtonModule,InputTextModule,MenuModule,SidebarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit ,DoCheck {

  isHome              : boolean = false;
  isLogin             : boolean = false;
  isSignup            : boolean = false; 
  isUser              : boolean = false; 
  isAdmin             : boolean = false;
  isManager           : boolean = false;
  isIndex             : boolean = false;
  dashName            :string   = '';
  
  constructor(private router:Router, private viewportScroller: ViewportScroller) { }
  ngOnInit(): void {
    this.checkUser();
  }
  resetFlags(): void{
    this.isHome = false;
    this.isLogin = false;
    this.isSignup = false;
    this.isUser = false;
    this.isAdmin = false;
    this.isManager = false;
    this.isIndex = false;
  }
  ngDoCheck(): void {
    // Reset flags
    this.resetFlags();

    // Set flags based on the current router url
    if (this.router.url === "/") {
        this.isHome = true;
    } else if (this.router.url === "/login") {
        this.isLogin = true;
    } else if (this.router.url === "/signup") {
        this.isSignup = true;
    } else if (this.router.url.startsWith("/user")) {
        this.isUser = true;
        this.isAdmin = false;
        this.isIndex = false;
    } else if (this.router.url.startsWith("/admin")) {
        this.isAdmin = true;
    } else if (this.router.url.startsWith("/manager")) {
      this.isAdmin = true;
    } else if (this.router.url === "") {
        this.isIndex = true;
    }
  }
  checkUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
      if (loggedUser) {
        
        this.dashName = loggedUser.firstName;
        
      }
    }else{
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

  scrollToFooter(): void {
    this.viewportScroller.scrollToAnchor('footer');
  }

}
