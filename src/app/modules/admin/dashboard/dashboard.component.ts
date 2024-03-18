import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlogChartComponent } from '../../../shared/components/blog-chart/blog-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BlogChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
