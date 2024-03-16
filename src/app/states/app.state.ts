import { AuthorState } from "./author/author.reducer";
import { BlogState } from "./blogs/blog.reducer";
import { SidebarState } from "./sidebar/sidebar.reducer";

export interface AppState {
    blogs: BlogState,
    author: AuthorState,
    sidebar: SidebarState
}