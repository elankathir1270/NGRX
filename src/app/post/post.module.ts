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
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostlistComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'update/:id', component: UpdatePostComponent },
      { path: 'details/:id', component: SinglePostComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PostlistComponent,
    AddPostComponent,
    UpdatePostComponent,
    SinglePostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostModule {}
