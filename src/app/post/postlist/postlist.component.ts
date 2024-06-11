import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Post, PostsState } from '../state/post.state';
import { getPosts } from '../state/post.selector';
import { deletePost, loadPost } from '../state/post.actions';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent {

  posts : Post[];

  constructor(private store : Store<PostsState>) {}

  ngOnInit() {
    this.store.dispatch(loadPost());
    this.store.select(getPosts).subscribe((res) => {
      this.posts = res;
    });
  }
  onDeletePost(id: string) {
    if(confirm("Are you sure want to delete the post")){
      this.store.dispatch(deletePost({id}))
    }
  }
}
