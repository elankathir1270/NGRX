import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./post.state";


const getPostStates = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostStates, (state) => {
  return state.posts;
})
