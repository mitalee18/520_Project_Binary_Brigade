
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MenubarModule],
})
export class NavBarComponent {

  constructor(private router: Router){}

  goToProfile(){
    if(localStorage.getItem('user_type') === '1'){
      this.router.navigate(['/doctor-profile']);
    }
    else if(localStorage.getItem('user_type') === '0'){
      this.router.navigate(['/patient-profile']);
    }

  }

}