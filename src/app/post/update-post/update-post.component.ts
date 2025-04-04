import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostByIdByRoute } from '../state/post.selector';
import { Post, PostsState } from '../state/post.state';
import { updatePost } from '../state/post.actions';
import { getCurrentRoute } from 'src/app/store/router/route-selector';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent {
  updatePostForm: FormGroup;
  post: Post;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<PostsState>,
    private router: Router
  ) {}

  ngOnInit() {
    //usingRouterState
    this.createForm();
    this.store.select(getPostByIdByRoute).subscribe((post) => {
      if (post) {
        this.post = post;
        this.updatePostForm.patchValue({
          title: this.post.title,
          description: this.post.description,
        });
      }
    });

    //usualWay
    // this.activateRoute.paramMap.subscribe((param) => {
    //   const id = param.get('id');

    //   this.store.select(getPostById, { id }).subscribe((res) => {
    //     this.post = res;
    //     //console.log(this.post);
    //     this.createForm();
    //   });
    // });
  }

  createForm() {
    //while Using RouterState
    this.updatePostForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });

    //usualWay
    // this.updatePostForm = new FormGroup({
    //   title: new FormControl(this.post.title, [Validators.required]),
    //   description: new FormControl(this.post.description, [
    //     Validators.required,
    //   ]),
    // });
  }

  onUpdatedFormSubmit() {
    const title = this.updatePostForm.value.title;
    const description = this.updatePostForm.value.description;

    const post = {
      id: this.post.id,
      title,
      description,
    };
    this.store.dispatch(updatePost({ post: post }));
    this.router.navigate(['postlist']);
  }
}
