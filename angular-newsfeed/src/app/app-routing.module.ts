import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { TimelineComponent } from '../app/timeline/timeline.component';
import { NewsPageComponent } from '../app/news-page/news-page.component';
import { RegisterComponent } from '../app/register/register.component';
import { AdminPostApprovePageComponent } from './admin-post-approve-page/admin-post-approve-page.component';
import { EditPostComponent } from './edit-post/edit-post.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'news/:id/:slug', component: NewsPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPostApprovePageComponent },
  { path: 'editPost/:id', component: EditPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
