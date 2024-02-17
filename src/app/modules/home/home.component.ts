import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){}

  handleReadBlogsCliked() {
    this.router.navigate(['blogs'])
  }

  handleCreateOneClicked() {
    this.router.navigate(['create'])
  }

}
