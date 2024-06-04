import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter/counter.component';
import { PostlistComponent } from './post/postlist/postlist.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "counter", component: CounterComponent},
  {path: "postlist", component : PostlistComponent,
   children: [
    {path: "add", component: AddPostComponent},
    {path: "update/:id", component: UpdatePostComponent}

   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
