
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { SessionService } from '../service/session.service';

/**
 * Angular component for the navigation bar of the application.
 * Manages navigation links, user-specific functionality, and session logout.
 */

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MenubarModule, CommonModule],
})
export class NavBarComponent {

  /**
   * Constructor for NavBarComponent.
   * @param router - Angular Router service for navigation.
   * @param sessionService - Service for managing user sessions.
   */
  constructor(private router: Router,
    private sessionService: SessionService){}

  /**
   * Navigates to the user's profile page based on their user type.
   */

  goToProfile(){
    if(localStorage.getItem('user_type') === '1'){
      this.router.navigate(['/doctor-profile']);
    }
    else if(localStorage.getItem('user_type') === '0'){
      this.router.navigate(['/patient-profile']);
    }
  }

  /**
   * Logs the user out of the session and navigates to the home page.
   */

  logout(){
    this.sessionService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Checks if the user type is 'Patient'.
   * @returns True if the user type is 'Patient', otherwise false.
   */

  isSpecificUserIdPresent(): boolean{
    if(localStorage.getItem('user_type') === '0'){
      return true;
    }
    return false;

  }
  /**
   * Navigates to the doctor table page.
   */

  searchClick(){
    this.router.navigate(['/doctor-table']);
  }

  /**
   * Navigates to the home page based on the user type.
   */

  homeClick(){
    if(localStorage.getItem('user_type') === '1'){
      this.router.navigate(['/doctor-dashboard']);
    }
    else if(localStorage.getItem('user_type') === '0'){
      this.router.navigate(['/patient-dashboard']);
    }
  }

}
