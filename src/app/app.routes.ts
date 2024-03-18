import { Routes } from '@angular/router';
import { BlogsComponent } from './modules/blogs/blogs.component';
import { CreateBlogComponent } from './modules/create-blog/create-blog.component';
import { ViewBlogComponent } from './modules/view-blog/view-blog.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { canActivate,  canActivatePublicRoutes,  resolve, resolveChart } from './core/guards/guards';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { UsersComponent } from './modules/admin/users/users.component';

export const routes: Routes = [
    {path:'', title:'Home', component:HomeComponent},
    {path:'login', title:'Login', component:LoginComponent, canActivate:[canActivatePublicRoutes]},
    {path:'register', title:'Signup', component:RegisterComponent, canActivate:[canActivatePublicRoutes]},
    {path:'blogs', title:'Blogs', component:BlogsComponent},
    {path:'create', title:'Create', component:CreateBlogComponent, canActivate:[canActivate]},
    {path:'blog/:id', title:'Blog', component:ViewBlogComponent, resolve:{blog:resolve}},
    {path: 'admin', canActivateChild:[canActivate], children: [
        {path: 'dashboard', component: DashboardComponent, resolve: {chartDetails:resolveChart}},
        {path: 'users', component: UsersComponent},
    ]},
    {path:'not-found', title:'Not-Found', component:NotFoundComponent},
    {path:'**', title:'Not-Found', component:NotFoundComponent},
];
