import { PostsState } from "./post.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";


const getPostStates = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostStates, (state) => {
  return state.posts;
})

export const getPostById = createSelector(getPostStates, (state, props) => {
  return state.posts.find((post) => post.id === props.id);
})
