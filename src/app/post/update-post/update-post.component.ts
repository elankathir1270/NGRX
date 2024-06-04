import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/post.selector';
import { Post } from '../state/post.state';
import { updatePost } from '../state/post.actions';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent {

  updatePostForm : FormGroup;
  post : Post;

  constructor(
    private activateRoute: ActivatedRoute,
    private store : Store<AppState>,
    private router : Router
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((param) => {
      const id = param.get('id')

      this.store.select(getPostById, {id}).subscribe((res) => {
        this.post = res;
        //console.log(this.post);
        this.createForm();
      })
    })
  }

  createForm() {
    this.updatePostForm = new FormGroup({
      title : new FormControl(this.post.title,[Validators.required]),
      description : new FormControl(this.post.description,[Validators.required])
    })
  }

  onUpdatedFormSubmit() {

    const title = this.updatePostForm.value.title;
    const description = this.updatePostForm.value.description;

    const post = {
      id: this.post.id,
      title,
      description
    }
    this.store.dispatch(updatePost({post : post}));
    this.router.navigate(['postlist'])
  }

}
