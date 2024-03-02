import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ MatMenuModule, MatButtonModule, ButtonComponent, IconComponent, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) {}
  handleLogout() {
    localStorage.clear()
    this.router.navigate(["login"])
  }
}
