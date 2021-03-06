import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "@root/home/home.component";
import { BlogComponent } from "@root/blog/blog.component";
import { PageNotFoundComponent } from "@shared/error-pages/page-not-found/page-not-found.component";
import { GoalComponent } from "@root/goal/goal.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'worklog', component: GoalComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
})
export class AppRouterModule { }
