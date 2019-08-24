import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { TimelineComponent } from '../app/timeline/timeline.component';
import { NewsPageComponent } from '../app/news-page/news-page.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'news/:id', component: NewsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
