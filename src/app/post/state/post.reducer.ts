import { createReducer, on } from '@ngrx/store';
import { initialState, postAdapter } from './post.state';
import {
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPostSuccess,
  updatePost,
  updatePostSuccess,
} from './post.actions';
import { count } from 'rxjs';

export const postsReducer = createReducer(
  initialState,

  // on(loadPostSuccess, (state, action) => {
  //   return {
  //     ...state,
  //     posts: action.posts,
  //   };
  // }),
  // on(addPostSuccess, (state,action) => {

  //   let post = {...action.post}

  //   return {
  //     ...state,
  //     posts : [...state.posts,post]
  //   }
  // }),
  // on(updatePostSuccess, (state, action) => {
  //   const updatedPost = state.posts.map((post) => {
  //     return action.post.id === post.id ? action.post : post;
  //   });
  //   return {
  //     ...state,
  //     posts: updatedPost,
  //   };
  // }),
  // on(deletePostSuccess, (state, action) => {
  //   const remainingPosts = state.posts.filter((post) => {
  //     return post.id !== action.id;
  //   });
  //   return {
  //     ...state,
  //     posts: remainingPosts,
  //   };
  // }),

  //After Entity Implementation

  on(addPostSuccess, (state, action) => {
    return postAdapter.addOne(action.post, {
      ...state,
      count: state.count + 1,
    }); //if other property like 'count' than defined property 'post'
  }),

  on(deletePostSuccess, (state, action) => {
    return postAdapter.removeOne(action.id, state);
  }),
  on(loadPostSuccess, (state, action) => {
    return postAdapter.setAll(action.posts, state);
  }),
  on(updatePostSuccess, (state, action) => {
    return postAdapter.updateOne(action.post, state);
  })
);
