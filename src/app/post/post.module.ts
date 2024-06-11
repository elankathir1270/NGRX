import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostlistComponent } from './postlist/postlist.component';
import { AddPostComponent } from './add-post/add-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './state/post.effects';

const routes : Routes = [
  {path: "", component : PostlistComponent,
  children: [
   {path: "add", component: AddPostComponent},
   {path: "update/:id", component: UpdatePostComponent}

  ]
 }
]

@NgModule({
  declarations: [
    PostlistComponent,
    AddPostComponent,
    UpdatePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('posts',postsReducer),
    EffectsModule.forFeature([PostEffects])
  ]
})
export class PostModule { }
