import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { constants } from '../../../../constants/constants';

@Component({
  selector: 'app-go-back-button',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './go-back-button.component.html',
  styleUrl: './go-back-button.component.css'
})
export class GoBackButtonComponent {
  constants = constants
  constructor(private location:Location) {}
  handleGoBack() {
    this.location.back();
  }
}
