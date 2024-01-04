import { createAction, props } from "@ngrx/store";
import { Blogs } from "../../shared/models/blogModel";


export const loadBlogs = createAction('[Blogs Component] Load Blogs', props<{page:number, limit:number}>());
export const loadBlogsSuccess = createAction('[Blogs Component] Load Blogs Success', props<{data:any}>());
export const loadBlogsFailure = createAction('[Blogs Component] Load Blogs Success', props<{error:any}>());