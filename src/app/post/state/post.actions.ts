import { createAction, props } from "@ngrx/store";
import { Post } from "./post.state";


export const addPost = createAction('add_post_action',props<{post: Post}>());
