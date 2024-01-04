import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BlogService } from "../../core/services/blog-service/blog-service.service";
import { loadBlogs, loadBlogsFailure, loadBlogsSuccess } from "./blog.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class BlogsEffects {
    loadBlogs$ = createEffect(() => 
      this.actions$.pipe(
        ofType(loadBlogs),
        exhaustMap((payload) => this.blogService.getBlogs(payload.page, payload.limit).pipe(
            map(blogs => loadBlogsSuccess({data:blogs})),
            catchError((error) => of(loadBlogsFailure({error: '[Blogs API] Blogs Loaded Error :'+ error})))
        )))
      )


constructor(private actions$: Actions, private blogService: BlogService) {}
}