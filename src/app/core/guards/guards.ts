import { inject } from "@angular/core";
import { BlogService } from "../services/blog-service/blog-service.service";
import {  ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Blogs } from "../../shared/models/blogModel";
import { Observable, catchError, map, of } from "rxjs";
import { AuthorService } from "../services/author-service/author.service";


export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const router:Router = inject(Router)
  const authorService:AuthorService = inject(AuthorService);
  return authorService.authenticate()
  .pipe(
      map((data: any) => {
          let isAuthenticated: boolean = false;
          if (!data?.error && data?.status === 200) {
              isAuthenticated = true;
              if (data?.accessToken) {
                  localStorage.setItem('token', data?.accessToken);
              }
          } else {
              isAuthenticated = false;
              router.navigate(['/login'])
          }

          return isAuthenticated;
      }),
      catchError((error: any) => {
          console.log(error, 'authentication error');
          router.navigate(['/login'])
          return of(false);
      })
  );
}

export const canActivatePublicRoutes: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router:Router = inject(Router)
  const authorService:AuthorService = inject(AuthorService);
  return authorService.authenticate()
  .pipe(map((data:any) => {
          if (!data?.error && data?.status === 200) {
              router.navigate([''])
              return false
          } else {
              localStorage.clear()
              return true
          }
      }),
      catchError((error: any) => {
          console.log(error, 'authentication error');
          localStorage.clear()
          return of(true);
      })
  )
}

export const resolve:ResolveFn<Blogs> = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot): any => {
    const blogService:BlogService = inject(BlogService);
    const id:string = route.paramMap.get('id') as string;
    return blogService.getBlogById(id)
  }