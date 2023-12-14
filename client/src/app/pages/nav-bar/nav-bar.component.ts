
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MenubarModule, CommonModule],
})
export class NavBarComponent {

  constructor(private router: Router,
    private sessionService: SessionService){}

  goToProfile(){
    if(localStorage.getItem('user_type') === '1'){
      this.router.navigate(['/doctor-profile']);
    }
    else if(localStorage.getItem('user_type') === '0'){
      this.router.navigate(['/patient-profile']);
    }
  }

  logout(){
    this.sessionService.logout();
    this.router.navigate(['/']);
  }

  isSpecificUserIdPresent(): boolean{
    if(localStorage.getItem('user_type') === '0'){
      return true;
    }
    return false;

  }

  searchClick(){
    this.router.navigate(['/doctor-table']);
  }

  homeClick(){
    if(localStorage.getItem('user_type') === '1'){
      this.router.navigate(['/doctor-dashboard']);
    }
    else if(localStorage.getItem('user_type') === '0'){
      this.router.navigate(['/patient-dashboard']);
    }
  }

}