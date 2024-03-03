import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { BlogsEffects } from './states/blogs/blog.effects';
import { BlogReducer } from './states/blogs/blog.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthorEffects } from './states/author/author.effects';
import { AuthorReducer } from './states/author/author.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideStore(),
    provideState({name:'blogs', reducer: BlogReducer}),
    provideState({name: 'author', reducer: AuthorReducer}),
    provideEffects(BlogsEffects),
    provideEffects(AuthorEffects),
    provideAnimationsAsync()
  ]
};
