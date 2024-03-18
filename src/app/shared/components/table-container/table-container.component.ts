import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.css'
})
export class TableContainerComponent {
  @Input() pageHeading:string = ''
}
