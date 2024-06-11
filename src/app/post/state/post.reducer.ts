import { createReducer, on } from "@ngrx/store";
import { initialState } from "./post.state";
import { addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePost, updatePostSuccess } from "./post.actions";


export const postsReducer = createReducer(initialState,

  on(loadPostSuccess, (state,action) => {
    return {
      ...state,
      posts : action.posts
    }
  }),
  on(addPostSuccess, (state,action) => {

    let post = {...action.post}

    return {
      ...state,
      posts : [...state.posts,post]
    }
  }),
  on(updatePostSuccess, (state,action) => {
    const updatedPost = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    })
    return {
      ...state,
      posts : updatedPost

    }
  }),
  on(deletePostSuccess, (state,action) => {
    const remainingPosts = state.posts.filter((post) => {
      return post.id !== action.id;
    })
    return {
      ...state,
      posts: remainingPosts
    }
  })
);
