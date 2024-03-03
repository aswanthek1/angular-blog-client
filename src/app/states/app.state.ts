import { AuthorState } from "./author/author.reducer";
import { BlogState } from "./blogs/blog.reducer";

export interface AppState {
    blogs: BlogState,
    author: AuthorState
}