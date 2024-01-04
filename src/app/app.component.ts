import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
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
  }

}
