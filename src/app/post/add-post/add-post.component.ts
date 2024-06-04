import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../state/post.state';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/post.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  postForm: FormGroup;
  post: Post

  constructor(private store: Store<AppState> ){}

  ngOnInit() {
    this.postForm = new FormGroup({
      title : new FormControl("",[Validators.required]),
      description : new FormControl("",[Validators.required])
    })
  }

  onFormSubmit() {
    this.post = this.postForm.value;
    //console.log(this.post);

    this.store.dispatch(addPost({post : this.post}));

  }

}
