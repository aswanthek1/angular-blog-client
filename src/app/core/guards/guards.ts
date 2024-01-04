import { inject } from "@angular/core";
import { BlogService } from "../services/blog-service/blog-service.service";
import {  ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Blogs } from "../../shared/models/blogModel";

export const resolve:ResolveFn<Blogs> = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot): any => {
    const blogService:BlogService = inject(BlogService);
    const id:string = route.paramMap.get('id') as string;
    return blogService.getBlogById(id)
  }