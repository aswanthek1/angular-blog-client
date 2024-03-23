import { Component, Input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.css'
})
export class TableContainerComponent {
  @Input() pageHeading:string = ''
  @Input() loading: boolean = false;
}
