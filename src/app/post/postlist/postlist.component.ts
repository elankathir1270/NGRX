import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Post } from '../state/post.state';
import { getPosts } from '../state/post.selector';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent {

  posts : Post[];

  constructor(private store : Store<AppState>) {}

  ngOnInit() {
    this.store.select(getPosts).subscribe((res) => {
      this.posts = res;
    });
  }

}
