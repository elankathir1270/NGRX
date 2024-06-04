import { createAction, props } from "@ngrx/store";
import { Post } from "./post.state";


export const addPost = createAction('add_post_action',props<{post: Post}>());
export const updatePost = createAction('update_post_action',props<{post : Post}>());
export const deletePost = createAction('delete_post_action', props<{id : string}>());
