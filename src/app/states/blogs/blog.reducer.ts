import { createReducer, on } from "@ngrx/store";
import { Blogs } from "../../shared/models/blogModel";
import { loadBlogs, loadBlogsFailure, loadBlogsSuccess } from "./blog.action";

export interface BlogState {
    blogs: Blogs[],
    loading: boolean,
    error: any,
    totalPage:number,
    count:number,
}

export const initialBlogState: BlogState = {
    blogs: [],
    loading: false,
    error: null,
    totalPage:0,
    count:0,
}

/// now create reducer functions

export const BlogReducer = createReducer(
    initialBlogState,
    on(loadBlogs, state => ({
        ...state,
        loading:true,
        error:null
    })),
    on(loadBlogsSuccess, (state, {data}) => ({
        ...state,
        blogs:data?.data || [],
        loading:false,
        error:null,
        totalPage:data?.totalPage,
        count:data?.count,
    })),
    on(loadBlogsFailure, (state, {error}) => ({
        ...state,
        error:error,
        loading:false
    }))
)