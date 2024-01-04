import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { CreateBlogComponent } from './modules/create-blog/create-blog.component';
import { ViewBlogComponent } from './modules/view-blog/view-blog.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { resolve } from './core/guards/guards';

export const routes: Routes = [
    {path:'', title:'Home', component:HomeComponent},
    {path:'create', title:'Create', component:CreateBlogComponent},
    {path:'blog/:id', title:'Blog', component:ViewBlogComponent, resolve:{blog:resolve}},
    {path:'not-found', title:'Not-Found', component:NotFoundComponent},
    {path:'**', title:'Not-Found', component:NotFoundComponent},
];
