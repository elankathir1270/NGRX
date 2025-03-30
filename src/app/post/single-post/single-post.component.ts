import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post, PostsState } from '../state/post.state';
import { getPostByIdByRoute } from '../state/post.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent {
  post$: Observable<Post>;

  constructor(private store: Store<PostsState>) {}

  ngOnInit() {
    this.post$ = this.store.select(getPostByIdByRoute);
  }
}
