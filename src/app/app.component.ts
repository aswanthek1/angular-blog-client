import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { Store } from '@ngrx/store';
import { AppState } from './states/app.state';
import { loadAuthor } from './states/author/author.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, LoaderComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>){}
  title = 'blog-client-angular';
  showLoader:boolean = false;
  router:Router = inject(Router)
  ngOnInit(): void {
    this.router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart) {
        this.showLoader = true
      }
      if(routerEvent instanceof NavigationEnd 
        || routerEvent instanceof NavigationCancel
        ) {
        this.showLoader = false
      }
      if(routerEvent instanceof NavigationError) {
        this.router.navigate(['not-found'])
      }
    })

    // for fetching logged in user
    // console.log(localStorage.getItem('token'), 'tokeng is')
    const token = localStorage.getItem('token')
    if(token) {
      // then fetch logged in user data and set in redux
      this.store.dispatch(loadAuthor())
    }

  }

}
