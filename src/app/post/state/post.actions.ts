import { createAction, props } from '@ngrx/store';
import { Post } from './post.state';
import { Update } from '@ngrx/entity';

export const loadPost = createAction('load_post_action');
export const loadPostSuccess = createAction(
  'load_post_success',
  props<{ posts: Post[] }>()
);
export const addPost = createAction('add_post_action', props<{ post: Post }>());
export const addPostSuccess = createAction(
  'add-post-success',
  props<{ post: Post }>()
);
export const updatePost = createAction(
  'update_post_action',
  props<{ post: Post }>()
);
export const updatePostSuccess = createAction(
  'update_post_success',
  props<{ post: Update<Post> }>() //After Entity Implementation
);
export const deletePost = createAction(
  'delete_post_action',
  props<{ id: string }>()
);
export const deletePostSuccess = createAction(
  'delete_post_success',
  props<{ id: string }>()
);

export const dummyAction = createAction('dummy-action');
