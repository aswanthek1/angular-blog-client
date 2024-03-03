import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorState } from '../../../states/author/author.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { selectAuthor } from '../../../states/author/author.selector';
import { clearAuthorState, loadAuthor } from '../../../states/author/author.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, ButtonComponent, IconComponent, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}
  author$: Observable<AuthorState> = this.store.select(selectAuthor)
  author!:AuthorState

  ngOnInit(): void {
    this.author$.subscribe({
      next:(data: AuthorState) => {
        this.author = data
      },
      error: (error) => {
        console.log(error, 'author error in navbar')
      }
    })
  }

  handleLogout() {
    localStorage.clear()
    this.store.dispatch(clearAuthorState())
    this.router.navigate(["login"])
  }
}
