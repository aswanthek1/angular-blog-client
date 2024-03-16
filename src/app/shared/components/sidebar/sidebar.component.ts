import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AppState } from '../../../states/app.state';
import { Store } from '@ngrx/store';
import { toggleSideBar } from '../../../states/sidebar/sidebar.action';
import { Observable } from 'rxjs';
import { selectSidebar } from '../../../states/sidebar/sidebar.selector';
import { SidebarState } from '../../../states/sidebar/sidebar.reducer';
import { adminSidebarLinks } from '../../../../constants/constants';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isOpen:boolean = false
  constructor(private store: Store<AppState>){}
  sidebar$:Observable<SidebarState> = this.store.select(selectSidebar)
  sectionClasses$:string = ''
  adminLinks = adminSidebarLinks;
  ngOnInit(): void {
    this.sidebar$.subscribe({
      next:(data) => {
        this.sectionClasses$ = data.classes
      }
    })
  }
  handleSidebar() {
    this.store.dispatch(toggleSideBar())
  }
}
