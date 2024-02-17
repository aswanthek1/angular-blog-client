import { Routes } from '@angular/router';
import { BlogsComponent } from './modules/blogs/blogs.component';
import { CreateBlogComponent } from './modules/create-blog/create-blog.component';
import { ViewBlogComponent } from './modules/view-blog/view-blog.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { resolve } from './core/guards/guards';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

export const routes: Routes = [
    {path:'', title:'Home', component:HomeComponent},
    {path:'login', title:'Login', component:LoginComponent},
    {path:'register', title:'Signup', component:RegisterComponent},
    {path:'blogs', title:'Blogs', component:BlogsComponent},
    {path:'create', title:'Create', component:CreateBlogComponent},
    {path:'blog/:id', title:'Blog', component:ViewBlogComponent, resolve:{blog:resolve}},
    {path:'not-found', title:'Not-Found', component:NotFoundComponent},
    {path:'**', title:'Not-Found', component:NotFoundComponent},
];
