import { Component, OnInit } from '@angular/core';
import { MenuItem } from './../../../../node_modules/primeng/api'

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit{
  items: MenuItem[] | undefined;
  
  ngOnInit() {
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          
      },
      {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          
      },
      {
          label: 'Appointments',
          icon: 'pi pi-fw pi-calendar',
      },
      {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          items: [
            {
              label: 'Log Out',
              icon: 'pi pi-fw pi-power-off'
            }
          ]
      }
    ];
  }
}
